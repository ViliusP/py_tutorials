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

type ImageBlurhashData = {
  provider: string;
  blurhash: string;
  version?: string;
  generated_at: string;
};

type ImagesBlurhashCache = {
  [src: string]: ImageBlurhashData;
};

// interface CloudinaryResponse {
//   resources: Resource[];
//   next_cursor: string;
//   rate_limit_allowed: number;
//   rate_limit_reset_at: string;
//   rate_limit_remaining: number;
// }

// interface Resource {
//   asset_id: string;
//   public_id: string;
//   format: string;
//   version: number;
//   resource_type: string;
//   type: string;
//   created_at: string;
//   bytes: number;
//   width: number;
//   height: number;
//   backup: boolean;
//   asset_folder: string;
//   display_name: string;
//   url: string;
//   secure_url: string;
// }


// const response : CloudinaryResponse = await cloudinary.api.resources()

// for(const resource of response.resources) {
//   console.log(resource.secure_url)
// }


interface ImageNode extends Node {
  tag?: string;
  props?: {
    [key: string]: any;
    src?: string;
    provider?: string;
    thumbHash?: string; // Assume thumbHash is intended to be blurhash
  };
}

interface ContentFile {
  _id: string;
  body: any; // Adjusted to any to prevent TS errors, ensure correct type is used
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

  const mode = import.meta.env.GENERATE_BLURHASH_MODE || "0"
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
          const isNetworkFile = /^https?:\/\//.test(node.props.src)

          // Cloud providers
          if (node.props.provider &&
            node.props.provider !== "ipx" &&
            node.props.provider.trim() !== ""
          ) {
            if (!(["2", "4"].includes(mode))) continue
            buffer = await processProviderImage(node.props.provider, node.props.src);
          }
          else if (isNetworkFile) {
            const response = await fetch(node.props.src);
            if (!response.ok) throw new Error(`Failed to fetch image: ${node.props.src}`);
            buffer = Buffer.from(await response.arrayBuffer());
          }
          else { // Local image
            const imagePath = path.join(imagesBaseDir, node.props.src);
            buffer = await sharp(imagePath).toBuffer();
          }
          console.info(`Generating blurhash for ${node.props.src}`)

          // Proceed with Sharp processing
          const resizedImage = await sharp(buffer).resize(100, 100, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
          const binaryThumbHash = rgbaToThumbHash(resizedImage.info.width, resizedImage.info.height, resizedImage.data);
          const thumbHashToBase64 = Buffer.from(binaryThumbHash).toString('base64');

          node.props.thumbHash = thumbHashToBase64;

          newBlurhashCache[node.props.src] = {
            provider: node.props.provider || "ipx",
            blurhash: thumbHashToBase64,
            generated_at: generationTime
          }
        } catch (error) {
          // @ts-ignore
          console.warn(`Error processing image ${node.props.src}:`, error.message);
        }
      }
      if (Object.keys(newBlurhashCache).length !== 0) {
        // Combine blurhashCache and newBlurhashCache, with newBlurhashCache replacing values for common keys
        const combinedCache: ImagesBlurhashCache = {
          ...oldBlurhashCache,
          ...newBlurhashCache
        };
        await saveThumbHashToJson(combinedCache)
        const { added, replaced } = countCacheChanges(oldBlurhashCache, newBlurhashCache);
        console.info(`Added items to cache: ${added}`);
        console.info(`Replaced items in cache: ${replaced}`);
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


async function processProviderImage(provider: string, src: string): Promise<Buffer> {
  switch (provider) {
    case "cloudinary":
      // Require the cloudinary library
      const cloudinary = v2

      // Return "https" URLs by setting secure: true
      cloudinary.config({
        secure: true
      });

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
      throw (`Provider ${provider} is not supported`)
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
    console.info('Blurhashes has been cached successfully.');
  } catch (error) {
    console.error('Error saving ThumbHash cache to JSON file:', error);
  }
}

async function readThumbHashJson(): Promise<any> {
  try {
    // Read the file content as a string
    const fileContents = await fs.readFile("./server/plugins/blurhash_cache.json", 'utf-8');
    
    // Parse the file contents as JSON
    const jsonData = JSON.parse(fileContents);
    
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error; // Re-throw the error after logging it
  }
}