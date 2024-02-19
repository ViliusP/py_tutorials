<script setup lang="ts">
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
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <ContentDoc v-slot="{ doc }">
          <article class="prose">
            <ProseH1>{{ doc.title }}</ProseH1>
            <ContentRenderer :value="doc" />
          </article>
        </ContentDoc>
      </v-col>
      <v-col cols="2" no-gutters>

        <!-- <v-navigation-drawer floating permanent location="right"> -->
        <!-- @vue-ignore -->
        <TOC class="toc" :links="page.body?.toc?.links"> </TOC>
        <!-- </v-navigation-drawer> -->
      </v-col>
    </v-row>


  </v-container>
</template>

<style>
.prose {
  max-width: 96ch;
}

.toc {
  position: fixed;
}
</style>
