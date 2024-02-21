<template>
  <nav>
    <span class="text-h6 font-weight-light">Turinys</span>
    <TocLinks :links="links" class="toc-links" />

  </nav>
</template>
  
<script setup lang="ts">
import type { PropType } from 'vue'
import type { TocLink } from '@nuxt/content/dist/runtime/types'

defineOptions({
  inheritAttrs: true
})

const props = defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => []
  }
})
</script>

<style>
/* .toc-links {
  border-left: 1px solid rgb(var(--v-theme-on-surface-variant));
} */

</style>