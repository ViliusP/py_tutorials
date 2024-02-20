<template>
  <span class="keyboard-keys">
    <template v-if="props.keys && props.keys.length > 0">
      <template v-for="(key, index) in props.keys" :key="index">
        <kbd>{{ key }}</kbd>
        <span v-if="index < props.keys.length - 1 && !any">+</span>
      </template>
    </template>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  keys?: string[] | null;
  any: boolean;
}>(), {
  keys: () => [] as string[], // Providing a default value as an empty array
  any: false, // Default value for keysTriggerMode
});
</script>

<style>
.keyboard-keys {
  font-family: 'Noto Sans Mono', 'monospace';
}

.keyboard-keys kbd {
  background: rgb(var(--v-theme-kbd));
  color: rgb(var(--v-theme-on-kbd));
  border-radius: 3px;
  display: inline;
  font-size: 85%;
  letter-spacing: 0;
  font-weight: normal;
  padding: 0.2em 0.4rem;
  box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
  text-transform: uppercase !important;
}

.keyboard-keys :not(:last-child) + kbd {
  margin-left: 2px; /* Adjust the value as needed */
}
</style>
