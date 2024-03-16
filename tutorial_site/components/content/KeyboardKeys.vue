<template>
  <span class="keyboard-keys">
    <template v-if="props.keys && props.keys.length > 0">
      <template v-for="(key, index) in props.keys" :key="index">
        <v-sheet
          tag="kbd"
          class="d-inline bg-transition"
          elevation="1"
          border
          rounded=""
          color="inverse-surface"
          >{{ key }}</v-sheet
        >
        <v-icon
          v-if="index < props.keys.length - 1 && !any"
          icon="mdi-plus"
          size="x-small"
        />
      </template>
    </template>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    keys?: string[] | null;
    any?: boolean;
  }>(),
  {
    keys: () => [] as string[], // Providing a default value as an empty array
    any: false, // Default value for keysTriggerMode
  }
);
</script>

<style>
.keyboard-keys {
  font-family: "Noto Sans Mono", "monospace";
  letter-spacing: 0;
  font-size: 85%;
  font-weight: normal;
  text-transform: uppercase !important;
}

.keyboard-keys kbd {
  padding: 0.1em 0.3rem;
}

.keyboard-keys :not(:last-child) + kbd {
  margin-left: 2px; /* Adjust the value as needed */
}

.keyboard-keys i {
  min-width: 0.7em;
  width: 0.7em;
  height: 0.7em;
  --v-icon-size-multiplier: 0.75;
}
</style>
