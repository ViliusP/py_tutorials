<template>
  <VAlert
    class="prose-v-alert my-4"
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
.prose-v-alert p {
  font-weight: 200;
}

.prose-v-alert p:not(:last-child) {
  margin-bottom: 8px; /* Adjust the value as needed */
}

</style>
