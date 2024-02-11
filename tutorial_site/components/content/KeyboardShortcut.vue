<template>
  <span class="keyboard-shortcut">
    <!-- Only render if props.keys is defined and not empty -->
    <template v-if="props.keys && props.keys.length > 0">
      <template v-for="(key, index) in props.keys" :key="index">
        <v-kbd>{{ key.toUpperCase() }}</v-kbd>
        <!-- Conditionally render the plus character if it's not the last item -->
        <span v-if="index < props.keys.length - 1">+</span>
      </template>
    </template>
  </span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Declare the component's props, allowing keys to be string array, null, or undefined
const props = defineProps<{
  keys?: string[] | null;
}>();
</script>

<style>
.keyboard-shortcut {
  font-family: 'Noto Sans Mono', 'monospace';
}
</style>
