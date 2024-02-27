<template>
  <VAlert
    class="prose-v-alert my-4"
    variant="outlined"
    density="compact"
    :type="type"
    :icon="icon"
  >
    <template template v-slot:title>
      <ContentSlot :use="$slots.title" unwrap="p" />
    </template>

    <template v-slot:text>
      <ContentSlot :use="$slots.default" unwrap="p" />
    </template>
  </VAlert>
</template>

<script setup lang="ts">

type AlertType = 'success' | 'error' | 'info' | 'warning';

defineProps({
  icon: {
    type: String,
    default: null,
  },
  type: {
    type: String as () => AlertType,
    default: null,
  }
});
</script>

<style>
.prose-v-alert p {
  font-weight: 200;
}

.prose-v-alert p {
  margin: 0;
}
</style>
