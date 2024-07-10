<script setup lang="ts">
import ColoredAvatar from "~/components/colored_avatar.vue";
import { useDisplay } from "vuetify";
import allAuthors from "~/assets/authors.json"

interface Author {
  name: string;
  surname: string;
  lightColor: string;
  darkColor: string;
}

const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
const { smAndUp: showToc } = useDisplay();

const author = getAuthorInfo(data, allAuthors)

function getAuthorInfo(page: any, authors: Author[]) {
  if (page?.value?.authors && Array.isArray(page.value.authors) && page.value.authors.length > 0) {
    const firstAuthor = page.value.authors[0];
    // Split the fullName into name and surname
    const [name, surname] = firstAuthor.split(' ');

    // Find the author in the array
    return authors.find(x => x.name === name && x.surname === surname);

  }
  return null;
}

</script>

<template>
  <v-container class="pa-0 py-8">
    <v-row class="flex-nowrap" justify="center">

      <!-- Content Column with alignment at the end -->
      <v-col class="flex-shrink-1" cols="auto">
        <!-- @vue-ignore -->
        <ContentRenderer :value="data">
          <article v-if="data" class="prose ml-auto">
            <ProseH1>{{ data?.title }}</ProseH1>
            <ColoredAvatar class="mt-n3" v-if="author" :author="author"/>
            <ContentRendererMarkdown :value="data" />
          </article>
        </ContentRenderer>
      </v-col>

      <!-- TOC Column with alignment at the start, shown only on md and up screens -->
      <v-col v-if="showToc" cols="4" md="3" xl="2" class="toc-column">
        <!-- @vue-skip -->
        <TOC class="toc" :links="data.body?.toc?.links" />
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
  top: 100px;
  /* Adjust based on desired top margin */
  max-height: 100vh;
  /* Adjust based on viewport height */
  overflow-y: auto;
}
</style>
