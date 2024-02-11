<template>
    <v-sheet :border="true" :elevation="0" class="image-container" >
        <img class="" :src="refinedSrc" :alt="alt" :width="width" :height="height">
    </v-sheet>
    <div v-if="props.alt" class="text-caption image-caption">
        {{ props.alt}}
    </div>
</template>
  
<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'

const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: ''
    },
    width: {
        type: [String, Number],
        default: undefined
    },
    height: {
        type: [String, Number],
        default: undefined
    }
})

const refinedSrc = computed(() => {
    if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
        const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
        if (_base !== '/' && !props.src.startsWith(_base)) {
            return joinURL(_base, props.src)
        }
    }
    return props.src
})
</script>

<style>
.image-container {
  display: inline-flex; /* Or inline-block, depending on your layout needs */
  padding: 0; /* Remove padding */
  line-height: 0; /* For removing space below the image */
}
.image-caption {
    margin-top: 4px;
    font-size: 0.875rem !important;
	font-weight: 400;
	line-height: 1.25rem;
	letter-spacing: 0.0333333333em !important;
	font-family: "Noto Sans", "Roboto", sans-serif;
	text-transform: none !important;
}
</style>