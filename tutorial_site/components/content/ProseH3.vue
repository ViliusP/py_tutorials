<template>
    <MaterialH3 :id="id" class="mt-8 mb-4">
        <a v-if="id && generate" :href="`#${id}`">
            <slot />
        </a>
        <slot v-else />
    </MaterialH3>
</template>
  
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import MaterialH3 from '../text/MaterialH3.vue';

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h3)
</script>

<style>
.prose .material-h3 a {
    color: inherit;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}
</style>