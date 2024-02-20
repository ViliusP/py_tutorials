import {visit} from 'unist-util-visit';

export default defineNitroPlugin((nitroApp) => {
  // @ts-ignore
  nitroApp.hooks.hook('content:file:afterParse', (file: any) => {
    if (file._id.endsWith('.md')) {
      visit(
          file.body, (n: any) => n.tag === 'ol',
          (node: any) => {
            node.children.forEach((liNode: any, index: number) => {
              if (liNode.tag === 'li') {
                console.log(liNode);

                liNode.props = liNode.props || {};
                // Add or modify properties here
                liNode.props.index = index
              }
            });
          });
    }
  });
});
