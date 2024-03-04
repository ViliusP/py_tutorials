import { visit } from 'unist-util-visit';
import sharp from 'sharp';
import { rgbaToThumbHash } from '~/utils/thumbhash';
import path from 'path';

interface ImageNode extends Node {
  tag?: string;
  props?: {
    [key: string]: any;
    src?: string;
    thumbHash?: string; // Assume thumbHash is intended to be blurhash
  };
}

interface ContentFile {
  _id: string;
  body: any; // Adjusted to any to prevent TS errors, ensure correct type is used
}

export default defineNitroPlugin((nitroApp) => {
  // @ts-ignore
  nitroApp.hooks.hook('content:file:afterParse', async (file: ContentFile) => {
    if (file._id.endsWith('.md')) {
      const projectRoot = process.cwd();
      const imagesBaseDir = path.join(projectRoot, 'public');

      const imgNodes: ImageNode[] = [];
      // @ts-ignore
      visit(file.body, { tag: 'img' }, (node) => {
        imgNodes.push(node as ImageNode);
      });

      for (const node of imgNodes) {
        node.props = node.props || {};
        
        // Skip if blurhash (thumbHash) already exists
        if (!node.props.src || node.props.thumbHash) continue;

        try {
          let buffer: Buffer;

          // Check if src is a network image
          if (/^https?:\/\//.test(node.props.src)) {
            // Network image
            const response = await fetch(node.props.src);
            if (!response.ok) throw new Error(`Failed to fetch image: ${node.props.src}`);
            buffer = Buffer.from(await response.arrayBuffer());
          } else {
            // Local image
            const imagePath = path.join(imagesBaseDir, node.props.src);
            buffer = await sharp(imagePath).toBuffer();
          }

          // Proceed with Sharp processing
          const resizedImage = await sharp(buffer).resize(100, 100, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
          const binaryThumbHash = rgbaToThumbHash(resizedImage.info.width, resizedImage.info.height, resizedImage.data);
          const thumbHashToBase64 = Buffer.from(binaryThumbHash).toString('base64');

          node.props.thumbHash = thumbHashToBase64;
        } catch (error) {
          // Log error gracefully
          // @ts-ignore
          console.error(`Error processing image ${node.props.src}:`, error.message);
          // Set a flag or a placeholder value to indicate failure
        }
      }
    }
  });
});
