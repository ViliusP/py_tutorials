<template>
  <v-list
    color="primary"
    bg-color="transparent"
    density="compact"
    nav
    v-if="links?.length"
    variant="outlined"
    :class="props.class"
  >
    <v-list-item
      :active="activeHeadings.includes(link.id)"
      active-class="text-primary"
      v-for="link in flattenedLinks"
      :key="link.text"
      :class="{
       'h3-toc-link': link.depth === 3,
       'ml-8': link.depth === 3,
      }"
      @click.prevent="scrollToHeading(link.id)"
    >
      <v-list-item-title v-text="link.text"></v-list-item-title>
      <!-- <a v-if="link.children" :links="link.children" /> -->
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
import type { TocLink } from '@nuxt/content';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';
import { onMounted } from 'vue';
import { useScrollObserver } from '~/composables/ScrollObserver';

// Define props using defineProps
const props = defineProps({
  links: {
    type: Array as PropType<TocLink[]>,
    default: () => [],
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined,
  },
});

// The rest of your setup code goes here
const emit = defineEmits(["move"]);
const router = useRouter();
const nuxtApp = useNuxtApp();
const { activeHeadings, updateHeadings } = useScrollObserver();

const flattenedLinks = computed(() => flattenArray(props.links));

onMounted(() => {
  updateHeadings([
    ...document.querySelectorAll("h2"),
    ...document.querySelectorAll("h3"),
  ]);
});

const scrollToHeading = (id: string) => {
  const encodedId = encodeURIComponent(id);
  router.push(`#${encodedId}`);
  emit("move", id);
};

function flattenArray(items: TocLink[]) : TocLink[] {
  const flat: TocLink[] = [];

  items.forEach(item => {
      flat.push({
          id: item.id,
          depth: item.depth,
          text: item.text
      });
      if (item.children) {
          flat.push(...flattenArray(item.children)); // Recursively flatten children
      }
  });

  return flat;
}
</script>

<style>
.h3-toc-link {
  min-height: 30px !important;
}
</style>