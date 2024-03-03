<template>
  <v-card
    :style="{ 'max-width': maxWidth, position: 'relative' }"
    class="prose-code"
    elevation="1"
    color="shiki-bg"
  >
    <v-btn
      icon
      variant="plain"
      size="small"
      style="position: absolute; right: 2.5px; top: 2.5px; z-index: 2;"
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
    <v-snackbar
        v-model="shouldShowSnackbar"
        content-class="bg-inverse-surface text-inverse-on-surface code-snackbar"
        timeout="3500"
      >
        {{
          t(
          copySuccessful ? "common.copy_successful" : "common.copy_unsuccessful"
          )
        }}
        <template v-slot:actions>
          <v-btn
            color="text-inverse-on-surface"
            icon="mdi-close"
            variant="plain"
            @click="shouldShowSnackbar = false"
        >
        </v-btn>
        </template>
    </v-snackbar>
    <!-- Scrollable content wrapper -->
    <div class="overflow-x-auto">
      <div v-if="filename" class="filename ml-2 text-caption text-left">
        <span class="text-medium-emphasis">{{ filename }}</span>
      <v-divider class="mr-12" :thickness="1" color="outline"/>
      </div>
      <v-card-text :class="{ 'py-2': filename, 'py-3': !filename }">
        <pre :class="['custom-font', $props.class]"><slot /></pre>
      </v-card-text>
    </div>
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

// -----------
// snackbar
// -----------
const showSnackbar = ref<boolean>(false);
const copySuccessful = ref<boolean | null>(null);
const shouldShowSnackbar = ref(false);

// Watch both `showSnackbar` and `copySuccessful` for changes
watch([showSnackbar, copySuccessful], ([newShow, newCopySuccess], [_, __]) => {
  // Update `shouldShowSnackbar` based on the new values
  shouldShowSnackbar.value = newShow && newCopySuccess !== null;
});

// Function to copy content to clipboard
const copyContent = async () => {
  copySuccessful.value = null;
  if (props.code) {
    try {
      await navigator.clipboard.writeText(props.code);
      copySuccessful.value = true;
    } catch (err) {
      copySuccessful.value = false;
} finally {
      showSnackbar.value = true;
    }
  }
};
// -----------
// code highlinting
// -----------

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

.code-snackbar .v-snackbar__actions {
  margin-inline-end: 0px;
}

.prose-code .filename {
  line-height: 1.5rem;
}
</style>
