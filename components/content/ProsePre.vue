<template>
  <v-card :style="{ 'max-width': maxWidth, position: 'relative', minHeight: '65px', 'height': computedHeight }"
    :class="['prose-code', { 'd-flex': computedHeight === 'none' }]" elevation="1" :color="computedColor">
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
          <span v-for="line in customLineNumbers" :key="line">{{ line }}</span>
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

// Define the type for the parsed metadata object to handle multiple data types
interface MetaObject {
  [key: string]: string | boolean | number;
}

const languageDefaults = new LanguageDefaults(props.language || 'default');


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
// Code Highlighting
// -----------

const parsedMeta = ref<MetaObject>({});

function parseMeta(metaString: string): MetaObject {
  const metaObject: MetaObject = {};
  if (metaString == null) {
    return metaObject;
  }
  metaString.split(";").forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key && value) {
      // Convert "true"/"false" strings into actual booleans
      metaObject[key.trim()] = value.trim() === 'true' ? true : value.trim() === 'false' ? false : value.trim();
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


const computedColor = computed(() => {
  return languageDefaults.color;
});

const languageLabel = computed(() => {
  return languageDefaults.label;
});

// Show line numbers if defined in meta or if custom-line-numbering is provided
const showLineNumbers = computed(() => {
  const lineNumbersMeta = parsedMeta.value["line-numbers"] ?? languageDefaults.lineNumbers;
  const customLineNumbering = parsedMeta.value["custom-line-numbering"];

  return lineNumbersMeta || (customLineNumbering !== null && customLineNumbering !== undefined);
});

const totalLines = computed(() => {
  return props.code ? props.code.split("\n").length - 1 : 0;
});

// Compute custom line numbers from the defined string or fall back to totalLines
const customLineNumbers = computed(() => {
  const numberingValue = parsedMeta.value["custom-line-numbering"];

  if (typeof numberingValue === 'string') {
    const generatedNumbers = numberingValue.split(",").flatMap(range => {
      const [start, end] = range.split("-").map(Number);
      return isNaN(end)
        ? [start]
        : Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }).slice(0, totalLines.value); // Limit to totalLines immediately

    // Calculate how many more numbers are needed
    const remaining = totalLines.value - generatedNumbers.length;
    
    if (remaining > 0) {
      const lastNumber = generatedNumbers[generatedNumbers.length - 1] || 0;
      return [
        ...generatedNumbers,
        ...Array.from({ length: remaining }, (_, i) => lastNumber + i + 1)
      ];
    }

    return generatedNumbers;
  }

  // Fallback to totalLines if custom-line-numbering is not provided
  return Array.from({ length: totalLines.value }, (_, i) => i + 1);
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
  color: rgba(142, 150, 170, 0.6);
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
