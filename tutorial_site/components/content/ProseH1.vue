<template>
    <MaterialH1 :id="id" class="material-h1 pb-4">
        <a v-if="generate" :href="`#${id}`">
            <slot />
        </a>
        <slot v-else />
    </MaterialH1>
</template>
  
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import MaterialH1 from '../text/MaterialH1.vue';

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h1)
</script>


<style>
.prose .material-h1 a {
    color: inherit;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}

.prose .material-h1 + div > p:first-child {
    font-weight: 200;
    margin-top: 0;
    margin-top: 0;
}
</style>
