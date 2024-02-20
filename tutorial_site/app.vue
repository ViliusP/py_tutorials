<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    const siteTitle = "Pygame pamokos";
    if (siteTitle == titleChunk) {
      return siteTitle;
    }
    return titleChunk ? `${titleChunk} - ${siteTitle}` : siteTitle;
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.katex {
  font-size: 1.05em;
  line-height: inherit;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
