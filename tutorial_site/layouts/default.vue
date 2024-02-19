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

      <!-- <v-app-bar-nav-icon ></v-app-bar-nav-icon> -->
      <v-toolbar-title>{{ t("hello.world") }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- <v-navigation-drawer >


      <v-list
        :lines="false"
        density="compact"
        nav
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          rounded="xl"
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>



      </v-navigation-drawer> -->

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
</script>