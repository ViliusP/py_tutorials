<template>
    <h2 :id="id" class="prose-h2 mt-12 mb-4">
        <a v-if="id && generate" :href="`#${id}`">
            <slot />
        </a>
        <slot v-else />
    </h2>
</template>
  
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h2)
</script>

<style>
.prose-h2 {
	font-size: 2.8rem !important;
	font-weight: 400;
	line-height: 3.25rem;
	letter-spacing: 0 !important;
	font-family: "Noto Sans", "Roboto", sans-serif;
	text-transform: none !important;
}

.prose-h2 a {
    color: inherit;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}
</style>
