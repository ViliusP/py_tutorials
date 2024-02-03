import en from './locales/en.json'
import lt from './locales/lt.json'

// import type { LocaleOptions } from "vuetify";
// import type { LocaleObject } from 'vue-i18n-routing';
// import type { Locale } from '@intlify/core-base';


export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'lt',
  messages: {
    lt,
    en,
  }
}))