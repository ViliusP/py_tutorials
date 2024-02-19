<template>
  <v-list density="compact" nav v-if="links?.length" variant="outlined">
    <v-list-item
      :active="activeHeadings.includes(link.id)"
      active-class="text-primary"
      v-for="link in links"
      :key="link.text"
      :slim="true"
      @click.prevent="scrollToHeading(link.id)"
      :class="[link.depth === 3 && 'pl-2']"
    >
      <v-list-item-title v-text="link.text"></v-list-item-title>
      <a v-if="link.children" :links="link.children" />
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { TocLink } from "@nuxt/content/dist/runtime/types";
import { useScrollObserver } from "~/composables/ScrollObserver";

defineOptions({
  inheritAttrs: false,
});

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

const emit = defineEmits(["move"]);

const router = useRouter();
const nuxtApp = useNuxtApp();
const { activeHeadings, updateHeadings } = useScrollObserver();

nuxtApp.hooks.hookOnce("page:finish", () => {
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
</script>
