<template>
    <MaterialH4 class="mt-8 mb-2">
        <slot />
    </MaterialH4>
</template>
  
<script setup lang="ts">
import MaterialH4 from '../text/MaterialH4.vue';
</script>

<style>
.prose .material-h4 a {
    color: inherit;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}
</style>