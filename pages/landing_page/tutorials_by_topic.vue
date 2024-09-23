<script setup lang="ts">
import { computed } from "vue";
import TutorialTopic from "~/components/TutorialTopic.vue";
import MaterialH3 from "~/components/text/MaterialH3.vue";
import MaterialP from "~/components/text/MaterialP.vue";
const { t } = useI18n();

const props = defineProps<{ topic: string }>();

const { data: navigation } = await useAsyncData("navigation" + " " + props.topic, () =>
    fetchContentNavigation(queryContent(props.topic))
);

const filteredNav = computed(() => {
    const children = navigation.value?.at(0)?.children

    if (!children) return [];
    return children
});

</script>

<template>
  <v-row class="ml-sm-n4 my-8">
    <v-sheet
      color="rgba(var(--v-theme-tertiary), 0.15)"
      class="w-100 mr-sm-8 mr-md-16 py-8 px-4 rounded-e-lg rounded-s-lg tutorial-sheet pattern-container"
      :elevation="0"
    >
      <v-row align="start" class="d-flex flex-row justify-center">
        <v-col
          cols="12"
          xl="3"
          xxl="3"
          md="12"
          lg="3"
          class="me-auto my-2 my-lg-0 align-self-center"
        >
            <MaterialH3 class="text-overline text-center mt-4 px-2">
                {{ t(`tutorials_${topic}.headline`) }}
            </MaterialH3>
            <MaterialP class="text-center mt-3 w-75 mx-auto tutorial-description">           
                {{ t(`tutorials_${topic}.description`) }}
            </MaterialP>

        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="4"
          xl="3"
          xxl="3"
          md="4"
          v-for="(navigationItem, index) in filteredNav"
          :key="navigationItem._path"
          v-if="filteredNav && Array.isArray(filteredNav)"
        >
          <TutorialTopic
            class="mx-md-1 mx-lg-4"
            :chapter="navigationItem.title"
            :tutorials="navigationItem.children || []"
            :index="index"
          />
        </v-col>
      </v-row>

      <svg class="landing-page-pattern" aria-hidden="true">
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="125"
            height="125"
            x="10"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
    </v-sheet>
  </v-row>
</template>

<style>
.tutorial-description {
  white-space: pre-line
}
</style>