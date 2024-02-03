import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ['vuetify']
  },


  modules: [
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ))
    },
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: './locales/i18n.config.ts' // if you are using custom path, default 
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  },
  devtools: { enabled: true }
});