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
          :disabled="item !== 'lt' && !dev"
          :active="item == locale"
          :key="index"
          :value="index"
        >
          <v-list-item-title>
            {{ item.toUpperCase() }}
          </v-list-item-title>
          <template v-slot:prepend>
            <div class="locale-flag mr-2">
              <FlagsLt v-if="item == 'lt'" />
              <FlagsUs v-else />
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
const availableLocales = useI18n().availableLocales.reverse();
const { locale } = useI18n();
const dev = process.env.NODE_ENV === 'development'

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
.locale-flag {
  position: relative;
  display: inline-block;
  width: 1.333333em;
  line-height: 0rem;
}

.locale-changer {
  height: 48px !important;
}
</style>
