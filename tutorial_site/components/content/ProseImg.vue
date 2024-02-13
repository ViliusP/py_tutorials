<template>
  <!-- @vue-ignore -->
  <v-img
    :src="img(src, { intHeight, quality: 80 })"
    :max-height="height"
    :alt="alt"
    :srcset="_srcset.srcset"
    :sizes="_srcset.sizes"
    position="left center"
    cov
  ></v-img>
  <figcaption v-if="props.title" class="text-caption image-caption">
    {{ props.title }}
  </figcaption>
</template>

<script setup lang="ts">
import { computed, useImage } from "#imports";

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
    default: 400,
  },
});

const img = useImage();

const _srcset = computed(() => {
  return img.getSizes(props.src, {
    sizes: "xs:100vw sm:90vw md:70vw lg:60vw xl:50vw",
    modifiers: {
      format: "webp",
      quality: 70,
      height: intVal(props.height),
    },
  });
});

const intHeight = computed(() => {
  return intVal(props.height);
});

function intVal(n: number | string): number {
  return typeof n === "number" ? n : parseInt(n, 10);
}
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
