<template>
  <ContentDoc v-slot="{ doc }">
    <article class="prose">
      <ProseH1>{{ doc.title }}</ProseH1>
      <ContentRenderer :value="doc" />
    </article>
  </ContentDoc>
</template>

<style>
.prose {
  max-width: 80ch;
}
</style>