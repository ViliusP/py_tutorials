<template>
  <div>
    <span>Turinys</span>
    <TocLinks :links="links" :class="[true ? 'lg:block' : 'hidden lg:block']" />

  </div>
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