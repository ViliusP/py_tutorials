<script setup lang="ts">
import type { LocaleObject } from 'vue-i18n-routing';

const { locale, locales } = useI18n()


const route = useRoute()

const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => (i as LocaleObject).code !== locale.value)
})
</script>

<template>
  <main>
    <ContentDoc path="/index" />
  </main>
</template>
