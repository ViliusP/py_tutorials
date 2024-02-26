import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@/assets/variables.scss";
// import { md3 } from 'vuetify/blueprints'

const primaryPallete = {
  "primary-variant-0": "#000000", 
  "primary-variant-10": "#0f2000",
  "primary-variant-20": "#1e3700",
  "primary-variant-25": "#264300",
  "primary-variant-30": "#2e4f00",
  "primary-variant-35": "#385c06",
  "primary-variant-40": "#436914",
  "primary-variant-50": "#5b822c",
  "primary-variant-60": "#749d44",
  "primary-variant-70": "#8db85b",
  "primary-variant-80": "#a8d474",
  "primary-variant-90": "#c3f18d",
  "primary-variant-95": "#d2ff9c",
  "primary-variant-98": "#f0ffd7",
  "primary-variant-99": "#f8ffe9",
  "primary-variant-100": "#ffffff",
}



const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#436914',
    'on-primary': "#ffffff",
    secondary: '#576249',
    'on-secondary': '#ffffff',
    tertiary: '#386663',
    'on-tertiary': '#ffffff',
    error: '#ba1a1a',
    'on-error': '#ffffff',
    background: '#fdfcf5',
    'on-background': '#1b1c18',
    surface: '#fdfcf5',
    'on-surface': '#1b1c18',
    'surface-variant': '#e1e4d5',
    'on-surface-variant': '#44483d',
    'outline': '#75796c',
    'outline-variant': '#c5c8ba',
    'shadow': '#000000',
    'shiki-bg': '#EFF1F5', // color for shiki highlighting
    ...primaryPallete,
  },
}


const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#a8d474',
    'on-primary': "#1e3700",
    secondary: '#bfcbad',
    'on-secondary': '#2a331e',
    tertiary: '#a0d0cc',
    'on-tertiary': '#003735',
    error: '#ffb4ab',
    'on-error': '#690005',
    background: '#1b1c18',
    "on-background": '#e3e3db',
    surface: '#1b1c18',
    'on-surface': '#e3e3db',
    'surface-variant': '#44483d',
    'on-surface-variant': '#c5c8ba',
    'outline': '#8e9285',
    'outline-variant': '#44483d',
    'shadow': '#000000',
    'shiki-bg': '#212121', // color for shiki highlighting
    ...primaryPallete,
  },
}


export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: "mdi",
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        "dark": darkTheme,
        "light": lightTheme,
      },
    },
    defaults: {
      VDivider :{
        color: "outline"
      }
    }
  });
  // @ts-ignore
  nuxtApp.vueApp.use(vuetify);
});
