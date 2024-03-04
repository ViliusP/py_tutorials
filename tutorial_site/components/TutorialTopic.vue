<script setup lang="ts">
import type { NavItem } from "@nuxt/content/types";

interface Props {
  chapter: string;
  tutorials: Array<NavItem>;
}

const props = withDefaults(defineProps<Props>(), {
  chapter: "",
  tutorials: () => [],
});

console.log(props.chapter)
</script>

<template>
  <v-card max-width="300">
    <v-list density="compact" nav>
      <v-list-subheader class="text-uppercase">
        {{ props.chapter }}
      </v-list-subheader>
      <v-list-item
        v-for="tutorial in props.tutorials"
        :key="tutorial._path"
        :title="tutorial.title"
        :subtitle="tutorial._path"
        :to="tutorial._path"
        nuxt
      />
    </v-list>
  </v-card>
</template>


<style></style>
