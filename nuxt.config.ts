import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "url";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import IgnoreDraftsModule from "./modules/ignore_drafts/index.mjs";
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
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
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
          integrity:
            "sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/theme-toggles@4.10.1/css/expand.min.css",
        },
      ],
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    IgnoreDraftsModule,
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins?.push(vuetify({ autoImport: true }))
      );
    },
  ],

  ignore: [
    "python_graph_drawing/**"
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
      concurrency: 12,
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
        default: "catppuccin-latte",
        dark: "material-theme-darker",
      },
      preload: [
        "python",
        "md",
        "json",
        "markdown",
        "powershell",
        "shell",
        "shellsession",
        "csv",
        "json",
        'xml'
      ],
    },
    markdown: {
      // Object syntax can be used to override default options
      // @ts-ignore
      remarkPlugins: {
        "remark-gfm": true,
        "remark-unwrap-images": true,
        "remark-math": true,
      },
      rehypePlugins: {
        "rehype-katex": {
          output: "html", // the default value is 'htmlAndMathml'
        },
      },
    },
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/kugelis/image/upload/'
    }
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
    detectBrowserLanguage: false,
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

  vueCompilerOptions: {
    plugins: []
  },

  compatibilityDate: "2024-09-09",
});