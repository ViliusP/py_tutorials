<template>
    <h1 :id="id" class="prose-h1 pb-4">
        <a v-if="generate" :href="`#${id}`">
            <slot />
        </a>
        <slot v-else />
    </h1>
</template>
  
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h1)
</script>


<style>
.prose-h1 {
	font-size: 5.25rem !important;
	font-weight: 400;
	line-height: 5.75rem;
	letter-spacing: 0 !important;
	font-family: "Noto Sans", "Roboto", sans-serif;
	text-transform: none !important;
}

.prose-h1 a {
    color: inherit;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}
</style>
