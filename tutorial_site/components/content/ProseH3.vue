<template>
    <h3 :id="id" class="prose-h3 mt-8 mb-4">
        <a v-if="id && generate" :href="`#${id}`">
            <slot />
        </a>
        <slot v-else />
    </h3>
</template>
  
<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h3)
</script>

<style>
.prose-h3 {
	font-size: 1.5rem !important;
	font-weight: 600;
	line-height: 1.625rem;
	letter-spacing: 0,0073529412em !important;
	font-family: "Noto Sans", "Roboto", sans-serif;
	text-transform: none !important;
}

.prose-h3 a {
    color: inherit;
    pointer-events: none;
    cursor: default;
    text-decoration: none;
}
</style>