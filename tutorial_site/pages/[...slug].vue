<template>
  <div>
    <ContentDoc v-slot="{ doc }">
      <article class="prose">
        <ProseH1>{{ doc.title }}</ProseH1>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </div>
</template>

<style>
.prose {
  max-width: 96ch;
}
</style>
