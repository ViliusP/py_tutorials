<template>
  <v-col>
    <v-card
      v-if="prev"
      class="mr-auto card-titles-in-right"
      max-width="400"
      variant="outlined"
      color="secondary"
      hover
      :title="prev.title"
      subtitle="ankstesnė pamoka"
      @click="router.push({ path: prev._path })"
      v-ripple
    >
      <template v-slot:prepend>
        <v-icon>mdi-arrow-left-drop-circle-outline</v-icon>
      </template>
    </v-card>
    <v-card
      v-if="!prev"
      class="mr-auto card-titles-in-right"
      max-width="400"
      variant="tonal"
      color="secondary"
      hover
      title="Į pradžia"
      subtitle=""
      @click="router.push({ path: '/' })"
      v-ripple
    >
      <template v-slot:prepend>
        <v-icon>mdi-home</v-icon>
      </template>
    </v-card>
  </v-col>
  <v-col>
    <v-card
      v-if="next"
      class="ml-auto"
      variant="outlined"
      color="secondary"
      hover
      max-width="400"
      :title="next.title"
      subtitle="sekanti pamoka"
      @click="router.push({ path: next._path })"
      v-ripple
    >
      <template v-slot:append>
        <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
      </template>
    </v-card>
    <v-card
      v-if="!next"
      class="ml-auto cursor-not-allowed"
      max-width="400"
      variant="outlined"
      color="secondary"
      title="Kuriama..."
      subtitle="Sekanti pamoka"
      disabled
    >
      <template v-slot:append>
        <v-icon>mdi-progress-wrench</v-icon>
      </template>
    </v-card>
  </v-col>
</template>

<script setup>  
const route = useRoute();
const router = useRouter();

const { data } = await useAsyncData(`surround_${route.path}`, () =>
  queryContent().only(["_path", "title"]).findSurround(route.path)
);

const [prev, next] = data.value;
</script>

<style>
.card-titles-in-right .v-card-item__content {
  text-align: right;
}

.no-next-card .v-card-items {
  padding: 0.625rem 1rem;
}

.no-next-card {
  max-height: 76px;
}

.no-next-card svg {
  max-width: 100%;
  max-height: 76px;
}
</style>
