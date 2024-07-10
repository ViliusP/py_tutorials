import { defineNuxtPlugin } from "nuxt/app"
import authors from '~/assets/authors.json'

export default defineNuxtPlugin({
  name: 'authors',
  setup() {
    return {
      provide: {
        authors: authors
      }
    }
  }
})
