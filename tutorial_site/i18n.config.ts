import en from './locales/en.json'
import lt from './locales/lt.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'lt',
  messages: {
    lt,
    en,
  }
}))