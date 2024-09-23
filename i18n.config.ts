import en from './locales/en.json'
import lt from './locales/lt.json'
import { } from "#i18n";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'lt',
  messages: {
    lt,
    en,
  }
}))