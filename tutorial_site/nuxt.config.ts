import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify", "vue-i18n"],
  },

  modules: [
    "@nuxtjs/i18n",
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins?.push(vuetify())
      );
    },
  ],
  i18n: {
    locales: [
      {
        code: 'lt',
        name: 'Lithuanian'
      },
      {
        code: 'en',
        name: 'English'
      },
    ],
    defaultLocale: 'lt',   
    vueI18n: './i18n.config.ts'
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  devtools: { enabled: true },
});
