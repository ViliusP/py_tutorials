<template>
  <v-btn class="dev-breakpoints" disabled>
    {{ name }}
  </v-btn>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { name } = useDisplay();
</script>

<style>
.dev-breakpoints {
  height: 48px !important;
}
</style>
