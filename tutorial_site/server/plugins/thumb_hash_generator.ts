import {visit} from 'unist-util-visit';
import sharp from 'sharp'
import { rgbaToThumbHash } from '~/utils/thumbhash';
import path from 'path'; // Import path module

interface ImageNode extends Node {
  tag?: string;
  props?: {
    [key: string]: any;
    src?: string
    thumbHash?: string; // Define additional properties as needed
  };
}

interface ContentFile {
  _id: string;
  body: String;
}


export default defineNitroPlugin((nitroApp) => {
  // @ts-ignore
  nitroApp.hooks.hook('content:file:afterParse', async (file: ContentFile) => {
    if (file._id.endsWith('.md')) {
      const projectRoot = process.cwd();
      const imagesBaseDir = path.join(projectRoot, 'public');

      // Collect nodes to process
      const imgNodes: ImageNode[] = [];
      // @ts-ignore
      visit(file.body, { tag: 'img' }, (node) => {
        imgNodes.push(node as ImageNode);
      });

      // Process each node asynchronously
      for (const node of imgNodes) {
        node.props = node.props || {};

        if(!node.props.src) continue
        const relativeImagePath = node.props.src;
        const imagePath = path.join(imagesBaseDir, relativeImagePath);

        // Image to ThumbHash
        try {
          const image = sharp(imagePath).resize(100, 100, { fit: 'inside' });
          const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
          const binaryThumbHash = rgbaToThumbHash(info.width, info.height, data);
          const thumbHashToBase64 = Buffer.from(binaryThumbHash).toString('base64')

          node.props.thumbHash = thumbHashToBase64;
          console.log(node.props.thumbHash)
          console.log(node)
        } catch (error) {
          console.error('Error processing image:', error);
        }
      }
    }
  });
});
