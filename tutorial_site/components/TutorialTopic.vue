<script setup lang="ts">
import type { NavItem } from "@nuxt/content/types";

const { t } = useI18n();

interface Props {
  chapter: string;
  tutorials: Array<NavItem>;
}

const props = withDefaults(defineProps<Props>(), {
  chapter: "",
  tutorials: () => [],
});

const icons = (index: number) => {
  if (index == null || index == undefined) return ["mdi-circle-medium"];

  const adjustedIndex = index + 1;
  if (adjustedIndex <= 10) {
    return [`mdi-numeric-${adjustedIndex}`];
  }
  const digits = splitToDigits(adjustedIndex);
  return digits.map((d) => `mdi-numeric-${d}`);
};

function splitToDigits(n: number): number[] {
  var digits = [];
  while (n != 0) {
    digits.push(n % 10);
    n = Math.trunc(n / 10);
  }
  digits.reverse();
  return digits;
}
</script>

<template>
  <v-card max-width="300">
    <v-list density="comfortable" nav>
      <v-list-subheader class="text-uppercase">
        {{ t(`topics.${props.chapter.toLowerCase()}`) }}
      </v-list-subheader>
      <v-list-item
        v-for="(tutorial, index) in props.tutorials"
        :key="tutorial._path"
        :to="tutorial._path"
        nuxt
      >
        <template v-slot:prepend>
          <v-icon size="small">
            <v-icon
              v-for="icon in icons(index)"
              :icon="icon"
              :class="{ 'multiple-icons': icons.length > 1 }"
            />
          </v-icon>
        </template>
        <v-list-item-title v-text="tutorial.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style></style>
