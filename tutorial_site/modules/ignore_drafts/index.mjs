// Modified version of code from github, nuxt-content issues:
// https://github.com/nuxt/content/issues/1523#issuecomment-1780126499

import { defineNuxtModule } from "@nuxt/kit";
import fm from "front-matter";
import fs from "fs";
import path from 'path';

export default defineNuxtModule({
    setup(_options, nuxt) {
        // @ts-ignore
        nuxt.hook("content:context", (contentContext) => {
            const env = JSON.parse(JSON.stringify(process.env)).NODE_ENV;

            const contentDir = path.resolve(nuxt.options.buildDir, "../content");
            if(env === "production" && fs.existsSync(contentDir)) {
                readDirectoryRecursively(contentDir, contentContext);
                console.log("Updated contentContext.ignores:", contentContext.ignores);
            }
        });
    },
});

function readDirectoryRecursively(directory, contentContext) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(directory, dirent.name);
        if (dirent.isDirectory()) {
            readDirectoryRecursively(fullPath, contentContext); // Recursively read subdirectories
        } else {
            try {
                if (fullPath.endsWith(".json")) {
                    const json = JSON.parse(fs.readFileSync(fullPath));
                    if (json.draft) contentContext.ignores.push(path.basename(fullPath));
                }
                if (fullPath.endsWith(".md")) {
                    const md = fm(fs.readFileSync(fullPath, "utf8"));
                    if (md.attributes?.draft) {
                        contentContext.ignores.push(path.basename(fullPath));
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    });
}