import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins?.push(vuetify())
      );
    },
  ],
  googleFonts: {
    families: {
      "Noto Sans": {
        wght: [400, 700],
        ital: [700]
      },
      'Noto Sans Mono': {
        wght: [400, 700],
      }
    },
  },
  content: {
    // documentDriven: true
    highlight: {
      // Theme used in all color schemes.
      theme: {
        // Default theme (same as single string)
        default: "material-theme-darker",
        // Theme used if `html.dark`
        dark: "material-theme-darker",
      },
      preload: ["python", "md", "json", "markdown", "powershell", "shell"],
    },
    markdown: {
      // Object syntax can be used to override default options
      // @ts-ignore
      remarkPlugins: {
        "remark-gfm": true,
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ["vuetify", "vue-i18n"],
  },
  i18n: {
    strategy: "no_prefix", // No path changes for locales
    locales: [
      {
        code: "lt",
        name: "Lithuanian",
      },
      {
        code: "en",
        name: "English",
      },
    ],
    defaultLocale: "lt",
    vueI18n: "./i18n.config.ts",
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
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  devtools: { enabled: true },
});
