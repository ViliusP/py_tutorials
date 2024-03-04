<template>
  <v-img
    :max-height="height"
    max-width="100%"
    :width="width"
    :alt="alt"
    :src="img(src, { quality: 80 })"
    :lazy-src="lazySrc"
    :sizes="_srcset.sizes"
    position="left center"
    contain
  >
    <template v-slot:placeholder>
      <div class="absolute ma-4">
        <v-progress-circular
          size="40"
          width="4"
          color="surface"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
  <figcaption
    v-if="props.title"
    class="text-caption image-caption"
    v-html="processedHtml"
  />
</template>
<script setup lang="ts">
import { computed, useImage } from "#imports";
import type { ImageModifiers } from "@nuxt/image";
import { processLatexString } from "~/utils/processLatexString";

const base64ToBinary = (base64: string): Uint8Array =>
  new Uint8Array(
    atob(base64)
      .split("")
      .map((x) => x.charCodeAt(0))
  );

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
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  format: {
    type: String,
    default: "webp",
  },
  thumbHash: {
    type: String,
    default: undefined,
  },
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
    modifiers: modifiers,
  });
});

const processedHtml = ref<string>("");
const lazySrc = ref<string>("");

onMounted(async () => {
  // @ts-ignore
  processedHtml.value = await processLatexString(props.title);

  if (props.thumbHash) {
    const thumbHashFromBase64 = base64ToBinary(props.thumbHash);
    lazySrc.value = thumbHashToDataURL(thumbHashFromBase64).toString();
  }
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
