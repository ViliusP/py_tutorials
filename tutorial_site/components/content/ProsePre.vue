<template>
  <v-card :style="{ 'max-width': maxWidth, position: 'relative', minHeight: '65px', 'height': computedHeight }"
    :class="['prose-code', { 'd-flex': computedHeight === 'none'}]" elevation="1" :color="computedColor">
    <v-btn icon variant="plain" size="small" style="position: absolute; right: 2.5px; top: 2.5px; z-index: 2;"
      @click="copyContent">
      <v-icon>mdi-content-copy</v-icon>
      <v-tooltip activator="parent" content-class="bg-inverse-surface text-inverse-on-surface" location="start"
        offset="2" close-delay="150">{{ t("common.copy") }}</v-tooltip>
    </v-btn>
    <v-snackbar v-model="shouldShowSnackbar" content-class="bg-inverse-surface text-inverse-on-surface code-snackbar"
      timeout="3500">
      {{
        t(
          copySuccessful ? "common.copy_successful" : "common.copy_unsuccessful"
        )
      }}
      <template v-slot:actions>
        <v-btn color="text-inverse-on-surface" icon="mdi-close" variant="plain" @click="shouldShowSnackbar = false">
        </v-btn>
      </template>
    </v-snackbar>
    <div class="floating-label">
      {{ languageLabel }}
    </div>
    <!-- Scrollable content wrapper -->
    <div class="overflow-x-auto d-flex flex-column  justify-center flex-1-1-100">
      <div v-if="filename" class="filename ml-2 text-caption text-left">
        <span class="text-medium-emphasis">{{ filename }}</span>
        <v-divider class="mr-12" :thickness="1" color="outline" />
      </div>
      <div :class="{ 'd-flex': showLineNumbers, 'py-2': filename, 'py-3': !filename }">
        <!-- Line numbers column -->
        <div v-if="showLineNumbers" class="line-numbers code-text" aria-hidden="true">
          <span v-for="line in totalLines" :key="line">{{ line }}</span>
        </div>
        <pre :class="['code-text', $props.class]" :style="preStyle"><slot /></pre>
      </div>
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

// Define the color mapping based on language
const languageColors: Record<string, string> = {
  console: 'shiki-bg-console',
  text: 'shiki-bg-text'
};

// Compute the color name based on the language prop
const computedColor = computed(() => {
  // Return the corresponding color or default if not found
  return languageColors[props.language] || 'shiki-bg';
});

// Define the color mapping based on language
const languageLabels: Record<string, string> = {
  "javascript": ".js",
  "text": "text",
  "python": ".py",
  "console": "cmd"
};

// Compute the color name based on the language prop
const languageLabel = computed(() => {
  // Return the corresponding color or default if not found
  return languageLabels[props.language] || '';
});

// -----------
// Code Highlighting
// -----------

const parsedMeta = ref<MetaObject>({});

function parseMeta(metaString: string): MetaObject {
  const metaObject: MetaObject = {};
  if (metaString == null) {
    return metaObject
  }
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

const computedHeight = computed(() => {
  const heightValue = parsedMeta.value["height"]; // Adjusted from 'max-width' to 'min-width'
  return heightValue ? `${heightValue}px` : 'none';
});

const showLineNumbers = computed(() => parsedMeta.value["lineNumbers"] === "true" || true);

const totalLines = computed(() => {
  return props.code ? props.code.split("\n").length - 1 : 0;
});

const preStyle = computed(() => ({
  display: showLineNumbers.value ? "inline-block" : "block",
}));

</script>

<style>
.code-text {
  line-height: 1.425;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  font-size: .875rem;
}

.code-text * {
  font-family: "Noto Sans Mono", "monospace";
}

.code-snackbar .v-snackbar__actions {
  margin-inline-end: 0px;
}

.prose-code .filename {
  line-height: 1.5rem;
}

span.line {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

span.line.highlight {
  transition: background-color .5s;
  display: block;
  --shiki-default-bg: rgba(101, 117, 133, .16);
  --shiki-dark-bg: rgba(142, 150, 170, .14);

}

.line.highlight>span {
  --shiki-default-bg: initial;
  --shiki-dark-bg: initial;
  /* Reset or apply new styles as needed */
}

.shiki code {
  display: block;
  width: fit-content;
  min-width: 100%;
  transition: color .5s;
}

.prose-code+.prose-code {
  margin-top: 16px;
}

.floating-label {
  position: absolute;
  right: 7.5px;
  bottom: 2.5px;
  z-index: 2;
  font-size: 14px;
  color: rgba(var(--v-theme-on-background), .15) !important;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}

.line-numbers {
  text-align: right;
  user-select: none;
  color: rgba(142, 150, 170, 0.6); /* Adjust color as needed */
  font-size: 0.875rem;
  line-height: 1.425;
  min-width: 2.2em;
}

.line-numbers span {
  display: block;
}

pre.code-text {
  width: 100%;
  flex: 1;
}
</style>
