<template>
  <v-btn class="locale-changer">
    <template v-slot:prepend>
      <v-icon icon="mdi-earth"></v-icon>
    </template>
    {{ $i18n.locale }}

    <v-menu activator="parent">
      <v-list @click:select="onLanguageSelect">
        <v-list-item
          v-for="(item, index) in availableLocales"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.toUpperCase() }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
const availableLocales = useI18n().availableLocales.reverse();
const { locale } = useI18n();

const onLanguageSelect = (item: {
  id: unknown;
  value: boolean;
  path: unknown[];
}) => {
  if (typeof item.id === "number" && item.id === item.id) {
    locale.value = availableLocales[item.id];
  }
};
</script>

<style>
.locale-changer {
  height: 48px !important;
}
</style>