<script setup lang="ts">
import TutorialTopic from "~/components/TutorialTopic.vue";

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);

console.log(navigation)
</script>

<template>
  <div class="d-flex flex-row justify-center">
    <TutorialTopic
      class="mx-10"
      v-for="navigationItem in navigation"
      :key="navigationItem._path"
      v-if="navigation && Array.isArray(navigation)"
      :chapter="navigationItem.title"
      :tutorials="navigationItem.children || []"
    />
  </div>
</template>
