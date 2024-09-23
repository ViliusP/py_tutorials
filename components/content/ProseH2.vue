<template>
    <MaterialH2 :id="id" class="mt-14 mb-4">
        <a v-if="id && generate" :href="`#${id}`">
            <slot />
        </a>
        <slot v-else />
    </MaterialH2>
</template>
  
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import MaterialH2 from '../text/MaterialH2.vue';

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)
</script>

<style>
.material-h2 a {
    color: inherit;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}
</style>
