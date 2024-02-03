import en from './locales/en.json'
import lt from './locales/lt.json'

export type LocaleMessageSchema = typeof en;

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    availableLocales: ['en', 'lt'],
    baseUrl: import.meta.env.VITE_BASE_URL,
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',  // recommended
    },  
    messages: {
      en,
      lt,
    },
  }))