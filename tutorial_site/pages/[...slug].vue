<script setup lang="ts">
import { useDisplay } from "vuetify";

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { smAndUp } = useDisplay();
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row justify="center">

      <!-- Content Column with alignment at the end -->
      <v-col cols="auto" >
        <ContentDoc v-slot="{ doc }">
          <article class="prose ml-auto">
            <ProseH1>{{ doc.title }}</ProseH1>
            <ContentRenderer :value="doc" />
          </article>
        </ContentDoc>
      </v-col>

      <!-- TOC Column with alignment at the start, shown only on md and up screens -->
      <v-col cols="auto" class="toc-column">
        <!-- @vue-skip -->
        <TOC class="toc" :links="page.body?.toc?.links"></TOC>
      </v-col>

    </v-row>
    
  </v-container>
</template>

<style>
.prose {
  max-width: 96ch;
}

.toc-column .toc {
  position: sticky;
  top: 100px; /* Adjust based on desired top margin */
  max-height: 100vh; /* Adjust based on viewport height */
  overflow-y: auto;
}
</style>
