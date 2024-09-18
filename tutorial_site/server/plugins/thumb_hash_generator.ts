import { visit } from 'unist-util-visit';
import sharp from 'sharp';
import { rgbaToThumbHash } from '~/utils/thumbhash';
import path from 'path';
import { v2 } from 'cloudinary'
import * as cheerio from 'cheerio';
import { type Node } from 'unist';
import blurhashCache from './blurhash_cache.json';
import fs from 'fs/promises';
import { type ParsedContent, type MarkdownParsedContent } from '@nuxt/content';

const DEFAULT_BLURHASH_MODE = "0";

const mode = import.meta.env.GENERATE_BLURHASH_MODE || DEFAULT_BLURHASH_MODE;

type ImageBlurhashData = {
  provider: string;
  blurhash: string;
  version?: string;
  generated_at: string;
};

type ImagesBlurhashCache = {
  [src: string]: ImageBlurhashData;
};

interface ImageNode extends Node {
  tag?: string;
  props?: {
    [key: string]: any;
    src?: string;
    provider?: string;
    thumbHash?: string; // Assume thumbHash is intended to be blurhash
  };
}

const blurhashModeInfo: { [key: string]: string } = {
  "0": "Use only cached blurhash values. Missing values will not be generated.",
  "1": "Generate blurhashes for local, remote images that are missing from the cache.",
  "2": "Generate blurhashes for both local, remote, cloud images that are missing from the cache.",
  "3": "Forcefully recalculate blurhashes for all local, remote images, excluding cloud images.",
  "4": "Forcefully recalculate blurhashes for all images (local, remote, cloud)."
};


export default defineNitroPlugin(async (nitroApp) => {

  let oldBlurhashCache: ImagesBlurhashCache = await readThumbHashJson()
  console.info(`Existing blurhash cache has ${Object.keys(oldBlurhashCache).length} items`);

  console.info("-".repeat(50))
  console.info(`Blurhash generation mode: ${mode}`)
  console.info(blurhashModeInfo[mode])
  console.info("-".repeat(50))


  nitroApp.hooks.hook('content:file:afterParse', async (file: ParsedContent) => {
    if (file._id.endsWith('.md')) {
      const markdownFile = file as MarkdownParsedContent;
      const projectRoot = process.cwd();
      const imagesBaseDir = path.join(projectRoot, 'public');

      const imgNodes: ImageNode[] = [];

      visit(markdownFile.body, { tag: 'img' }, (node) => {
        imgNodes.push(node as ImageNode);
      });

      const newBlurhashCache: ImagesBlurhashCache = {};
      const generationTime = new Date().toISOString()

      for (const node of imgNodes) {
        node.props = node.props || {};

        // Skip if blurhash (thumbHash) already exists
        if (!node.props.src || node.props.thumbHash) continue;

        node.props.thumbHash = oldBlurhashCache[node.props.src]?.blurhash

        if (mode === "0") continue;
        if (["1", "2"].includes(mode) && node.props.thumbHash) continue;

        try {
          let buffer: Buffer;
          // Check if src is a network image
          const isRemoteFile = /^https?:\/\//.test(node.props.src)

          if (!node.props.provider || node.props.provider === "ipx" || node.props.provider.trim() === "") {
            if (isRemoteFile) {
              const response = await fetch(node.props.src);
              if (!response.ok) throw new Error(`Failed to fetch image: ${node.props.src}`);
              buffer = Buffer.from(await response.arrayBuffer());
            } else {
              const imagePath = path.join(imagesBaseDir, node.props.src);
              buffer = await sharp(imagePath).toBuffer();
            }
          } else {
            if (!["2", "4"].includes(mode)) continue;
            buffer = await processProviderImage(node.props.provider, node.props.src);
          }
          console.info(`Generating blurhash for ${node.props.src}`)

          const resizedImage = await sharp(buffer).resize(100, 100, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
          const binaryThumbHash = rgbaToThumbHash(resizedImage.info.width, resizedImage.info.height, resizedImage.data);
          node.props.thumbHash = Buffer.from(binaryThumbHash).toString('base64');

          newBlurhashCache[node.props.src] = {
            provider: node.props.provider || "ipx",
            blurhash: node.props.thumbHash,
            generated_at: generationTime
          };

        } catch (error) {
          // @ts-ignore
          console.warn(`Error processing image ${node.props.src || 'unknown source'}:`, error instanceof Error ? error.message : error);
        }
      }
      if (Object.keys(newBlurhashCache).length !== 0) {
        // Combine blurhashCache and newBlurhashCache, with newBlurhashCache replacing values for common keys
        const combinedCache: ImagesBlurhashCache = Object.fromEntries(Object.entries({
          ...oldBlurhashCache,
          ...newBlurhashCache
        }).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)));
        await saveThumbHashToJson(combinedCache)
        const { added, replaced } = countCacheChanges(oldBlurhashCache, newBlurhashCache);
        console.info(`Cache changes - Added: ${added}, Replaced: ${replaced}`);
        oldBlurhashCache = combinedCache
      }
    }
  });
});

function countCacheChanges(oldCache: ImagesBlurhashCache, newCache: ImagesBlurhashCache): { added: number; replaced: number } {
  let addedCount = 0;
  let replacedCount = 0;

  for (const key in newCache) {
    if (key in oldCache) {
      replacedCount++;
    } else {
      addedCount++;
    }
  }

  return { added: addedCount, replaced: replacedCount };
}

/**
 * Processes an image based on its provider.
 * @param provider - The provider of the image (e.g., cloudinary).
 * @param src - The image source URL or path.
 * @returns {Promise<Buffer>} - A promise that resolves to a Buffer containing image data.
 * @throws Will throw an error if the provider is unsupported or image fetching fails.
 */
async function processProviderImage(provider: string, src: string): Promise<Buffer> {
  switch (provider) {
    case "cloudinary":
      const cloudinary = v2
      cloudinary.config({ secure: true });

      const imgTag = cloudinary.image(src, {
        transformation: [
          { height: 100 },
          { quality: "auto:eco" }
        ]
      })
      const $ = cheerio.load(imgTag);
      const cloudSrc = $('img').attr('src');

      if (!cloudSrc) throw "cloudinary image generated tag has no src property"
      return await downloadImageToBuffer(cloudSrc)

    default:
      throw (`The ${provider} provider is not supported`)
  }
}


async function downloadImageToBuffer(url: string): Promise<Buffer> {
  try {
    const response = await fetch(url);

    // Ensure the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert the response to an ArrayBuffer and then to a Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error) {
    console.error('Error downloading the image:', error);
    throw error;
  }
}

async function saveThumbHashToJson(thumbHashData: ImagesBlurhashCache): Promise<void> {
  try {
    // Save the thumbHash to the JSON file
    await fs.writeFile("./server/plugins/blurhash_cache.json", JSON.stringify(thumbHashData, null, 2), 'utf-8');
    console.info('Blurhashes have been cached successfully.');
  } catch (error) {
    console.error('Error saving ThumbHash cache to JSON file:', error);
  }
}

async function readThumbHashJson(): Promise<any> {
  try {
    const fileContents = await fs.readFile("./server/plugins/blurhash_cache.json", 'utf-8');
    const jsonData = JSON.parse(fileContents);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error; // Re-throw the error after logging it
  }
}