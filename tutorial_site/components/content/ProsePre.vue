<template>
  <v-card class="" width="400" elevation="2">
    <v-btn icon variant="plain" style="position: absolute; right: 0; top: 0;" @click="copyContent">
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>
    <v-card-text>
      <pre :class="$props.class"><slot/></pre>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})


// Function to copy content to clipboard
const copyContent = async () => {

  if (props.code) {
    try {
      await navigator.clipboard.writeText(props.code);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
};

</script> 
