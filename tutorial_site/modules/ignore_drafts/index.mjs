// From github, nuxt-content issues:
// https://github.com/nuxt/content/issues/1523#issuecomment-1780126499

import { defineNuxtModule } from "@nuxt/kit";
import fm from "front-matter";
import fs from "fs";

export default defineNuxtModule({
    setup(_options, nuxt) {
        // @ts-ignore
        nuxt.hook("content:context", (contentContext) => {
            const env = JSON.parse(JSON.stringify(process.env)).NODE_ENV;

            const contentDir = nuxt.options.buildDir + "/../content";
            if(env === "production" && fs.existsSync(contentDir)) {
                // Read the sub directories within ./content/ then check each .json or .md file for a draft field
                for (let subdir of fs.readdirSync(contentDir).filter((d) => d != ".DS_Store")) {
                    for (let file of fs.readdirSync(`${contentDir}/${subdir}`).map((f) => `${contentDir}/${subdir}/${f}`)) {
                        try {
                            if (file.endsWith(".json")) {
                                const json = JSON.parse(fs.readFileSync(file));

                                if (json.draft)
                                    contentContext.ignores.push(file.split("/").pop());
                            } else if (file.endsWith(".md")) {
                                const md = fm(fs.readFileSync(file, "utf8"));

                                if (md.attributes?.draft)
                                    contentContext.ignores.push(file.split("/").pop());
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                console.log("Updated contentContext.ignores:", contentContext.ignores);
            }
        });
    },
});