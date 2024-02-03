import en from './en.json'
import lt from './lt.json'

type MessageSchema = typeof en

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'lt',
  availableLocales: ['en', 'lt'],
  fallbackLocale: 'en',
  messages: {
    'en' :en,
    'lt': lt,
  }
}))