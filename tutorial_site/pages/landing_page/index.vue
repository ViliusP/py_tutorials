<script setup lang="ts">
import TutorialTopic from "~/components/TutorialTopic.vue";

definePageMeta({
  path: '/',
})

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
</script>

<script setup lang="ts">

</script>

<template>
  <v-container class="py-8 px-6">
    <v-row class="d-flex flex-row justify-center">
      <TutorialTopic
        class="mx-10"
        v-for="(navigationItem, index) in navigation"
        :key="navigationItem._path"
        v-if="navigation && Array.isArray(navigation)"
        :chapter="navigationItem.title"
        :tutorials="navigationItem.children || []"
        :index="index"
      />
    </v-row>
  </v-container>
</template>
