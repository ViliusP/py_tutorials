import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      title: "Pygame pamokos",
      meta: [
        { name: "description", content: "My amazing site" },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    }
  },
  modules: [
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins?.push(vuetify({ autoImport: true }))
      );
    },
  ],
  googleFonts: {
    families: {
      "Noto Sans": {
        wght: [200, 300, 400, 700],
        ital: [300, 400, 700],
      },
      "Noto Sans Mono": {
        wght: [400, 700],
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  content: {
    defaultLocale: "lt",
    locales: ["lt", "en"],
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
        "remark-unwrap-images": true,
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
