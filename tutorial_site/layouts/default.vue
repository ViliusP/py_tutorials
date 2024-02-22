<template>
  <v-app>
    <v-app-bar flat>
      <v-avatar class="ml-2" size="large" v-ripple @click="router.push({ path: '/' })">
        <v-img
          draggable="false"
          src="~/assets/images/icon.png"
          content-class="aaa"
          alt="Site icon"
        />
      </v-avatar>

      <v-toolbar-title>{{ t("hello.world") }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="toggleLightMode"> 
        <layout-theme-toggle :toggled="!lightMode" />
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid class="py-8 px-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const { t } = useI18n();
const router = useRouter()

const lightMode = ref(false)

function toggleLightMode() {
  lightMode.value = !lightMode.value;
}

</script>