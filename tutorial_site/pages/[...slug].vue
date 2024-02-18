<template>
  <ContentDoc v-slot="{ doc }">
    <article>
      <ProseH1>{{ doc.title }}</ProseH1>
      <ContentRenderer :value="doc" />
    </article>
  </ContentDoc>
</template>

