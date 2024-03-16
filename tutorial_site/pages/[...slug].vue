<script setup lang="ts">
import { useDisplay } from "vuetify";

const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
const { smAndUp: showToc } = useDisplay();
</script>

<template>
  <v-container class="pa-0 py-8">
    <v-row class="flex-nowrap" justify="center">

      <!-- Content Column with alignment at the end -->
      <v-col class="flex-shrink-1" cols="auto" >
        <ContentRenderer :value="data">
          <article v-if="data" class="prose ml-auto">
            <ProseH1>{{ data?.title }}</ProseH1>
            <ContentRendererMarkdown :value="data" />
          </article>
        </ContentRenderer>
      </v-col>

      <!-- TOC Column with alignment at the start, shown only on md and up screens -->
      <v-col v-if="showToc" cols="4" md="3" xl="2" class="toc-column">
        <!-- @vue-skip -->
        <TOC class="toc" :links="data.body?.toc?.links"/>
      </v-col>

    </v-row>
    <v-divider class="my-4" />
    <v-row justify="space-between"> 
      <HorizontalDocsNav />
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
