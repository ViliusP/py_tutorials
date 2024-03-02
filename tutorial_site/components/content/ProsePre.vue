<template>
  <v-card
    :style="{ 'max-width': maxWidth }"
    class="overflow-x-auto d-flex"
    elevation="1"
    color="shiki-bg"
  >
    <v-btn
      icon
      variant="plain"
      style="position: absolute; right: 2.5px; top: 2.5px"
      @click="copyContent"
    >
      <v-icon>mdi-content-copy</v-icon>
      <v-tooltip
        activator="parent"
        content-class="bg-inverse-surface text-inverse-on-surface"
        location="start"
        offset="2"
        close-delay="150"
        >{{ t("common.copy") }}</v-tooltip
      >
    </v-btn>
    <v-card-text>
      <pre :class="['custom-font', $props.class]"><slot/></pre>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const { t } = useI18n();

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

// Define the type for the parsed metadata object
interface MetaObject {
  [key: string]: string;
}

const parsedMeta = ref<MetaObject>({});

function parseMeta(metaString: string): MetaObject {
  const metaObject: MetaObject = {};
  metaString.split(";").forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key && value) {
      metaObject[key.trim()] = value.trim();
    }
  });
  return metaObject;
}

parsedMeta.value = parseMeta(props.meta);

// Function to copy content to clipboard
const copyContent = async () => {
  if (props.code) {
    try {
      await navigator.clipboard.writeText(props.code);
      // console.log('Content copied to clipboard');
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
};

// Compute the min-width based on the parsed meta, defaulting to 960px if not specified
const maxWidth = computed(() => {
  const maxWidthValue = parsedMeta.value["max-width"]; // Adjusted from 'max-width' to 'min-width'
  return maxWidthValue ? `${maxWidthValue}px` : "960px";
});
</script>

<style>
.custom-font * {
  font-family: "Noto Sans Mono", "monospace";
}
</style>
