<template>
  <VAlert
    class="prose-v-alert"
    variant="tonal"
    border="start"
    border-color="primary-variant-10"
    icon="mdi-format-quote-close-outline"
    density="compact"
  >
    <blockquote>
      <slot />
    </blockquote>
  </VAlert>
</template>

<style>
.prose-v-alert {
  margin-top: 12px;
  margin-bottom: 12px;
}

.prose-v-alert {
  padding-top: 12px;
  padding-bottom: 12px;
}


.prose-v-alert p {
  font-weight: 200;
}
</style>
