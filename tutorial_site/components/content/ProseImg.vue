<template>
  <!-- @vue-ignore -->
  <v-img
    :src="img(src, { quality: 80 })"
    :max-height="height"
    max-width="100%"
    :alt="alt"
    :srcset="_srcset.srcset"
    :sizes="_srcset.sizes"
    position="left center"
    contain
  ></v-img>
  <figcaption v-if="props.title" class="text-caption image-caption" v-html="processedHtml" />
</template>

<script setup lang="ts">
import { computed, useImage } from "#imports";
import type { ImageModifiers } from "@nuxt/image";
import { processLatexString } from '~/utils/processLatexString';

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: 600,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  format: {
    type: String,
    default: "webp",
  }
});

const img = useImage();

const _srcset = computed(() => {

  // Assuming ImageModifiers is the correct type, directly use Partial<ImageModifiers>
    let modifiers: Partial<ImageModifiers> = {
    format: props.format,
    quality: 70,
  };

  return img.getSizes(props.src, {
    sizes: "xs:100vw sm:90vw md:70vw lg:60vw xl:50vw",
    modifiers: modifiers
  });
});

const processedHtml = ref<string>('');

onMounted(async () => {
  // @ts-ignore
  processedHtml.value = await processLatexString(props.title);
});
</script>

<style>
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
