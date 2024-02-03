<template>
    <main>
      <ContentDoc />
  </main>
</template>
<!-- 
<script setup lang="ts">
import { useRuntimeConfig, useContent, useContentHead, useRequestEvent } from '#imports'
import type { LayoutKey } from '#build/types/layouts'

const { contentHead } = useRuntimeConfig().public.content
const { page, layout } = useContent()

// Page not found, set correct status code on SSR
if (!(page as any).value && process.server) {
  const event = useRequestEvent()
  if (event != undefined)
    event.res.statusCode = 404
}

if (contentHead) {
  useContentHead(page)
}
</script>

<template>
  <div class="document-driven-page">
    <ContentRenderer v-if="page" :key="(page as any)._id" :value="page">
      <template #empty="{ value }">
        <DocumentDrivenEmpty :value="value" />
      </template>
    </ContentRenderer>
    <DocumentDrivenNotFound v-else />
  </div>
</template> -->