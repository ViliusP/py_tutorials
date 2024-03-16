<template>
  <v-app class="bg-transition">
    <v-app-bar class="bg-transition" color="surface-variant" scroll-behavior="elevate">
      <v-avatar
        class="ml-2"
        size="large"
        v-ripple
        @click="router.push({ path: '/' })"
      >
        <v-img
          draggable="false"
          src="~/assets/images/icon.png"
          alt="Site icon"
        />
      </v-avatar>

      <v-toolbar-title>{{ t("hello.world") }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <layout-locale-changer class="mr-2"/>
      <v-app-bar-nav-icon @click="toggleTheme">
        <layout-theme-toggle :toggled="theme.global.current.value.dark" />
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const { t } = useI18n();
const router = useRouter();

const theme = useTheme();

function toggleTheme() {
  const turnTheDark = !theme.global.current.value.dark;
  theme.global.name.value = turnTheDark ? "dark" : "light";
  document.documentElement.classList.toggle("dark", turnTheDark);
  window.localStorage.setItem("dark-theme", turnTheDark.toString());
}

onNuxtReady(() => {
  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const isLocalStorageThemeSet =
    window.localStorage.hasOwnProperty("dark-theme");

  if (prefersDarkTheme && !isLocalStorageThemeSet) {
    window.localStorage.setItem("dark-theme", "true");
  }

  const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
  if (prefersLightTheme && !isLocalStorageThemeSet) {
    window.localStorage.setItem("dark-theme", "false");
  }

  const turnTheDark = window.localStorage.getItem("dark-theme") === "true";
  if (turnTheDark) {
    theme.global.name.value = turnTheDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", turnTheDark);
  }
});
</script>

<style>
.bg-transition {
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
