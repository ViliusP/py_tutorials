<script setup lang="ts">
const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
</script>

<template>
  <v-card class="mx-auto" max-width="300">
    <v-list density="compact" nav>
      <v-list-item
        v-for="navigationItem in navigation"
        :key="navigationItem._path"
        v-if="navigation && Array.isArray(navigation)"
        :title="navigationItem.title"
        :subtitle="navigationItem._path"
        :to="navigationItem._path"
        nuxt
      >
      </v-list-item>
    </v-list>
  </v-card>
</template>
