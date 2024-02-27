<script setup lang="ts">
const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
</script>

<template>
  <v-card class="mx-auto" max-width="300">
    <v-list density="compact" nav>
      <!-- @vue-skip -->
      <template
        v-for="navigationItem in navigation"
        :key="navigationItem._path"
        v-if="navigation && Array.isArray(navigation)"
      >
        <v-list-subheader class="text-uppercase" v-if="navigationItem.children.length != 0">{{
          navigationItem.title
        }}</v-list-subheader>
        <v-list-item
          v-for="navigationChildItem in navigationItem.children"
          :key="navigationChildItem._path"
          v-if="
            navigationItem.children && Array.isArray(navigationItem.children)
          "
          :title="navigationChildItem.title"
          :subtitle="navigationChildItem._path"
          :to="navigationChildItem._path"
          nuxt
        />
      </template>
    </v-list>
  </v-card>
</template>
