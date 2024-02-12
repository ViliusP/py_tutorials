<template>
  <v-layout>
      <v-app-bar>
          <!-- <v-app-bar-nav-icon ></v-app-bar-nav-icon> -->
          <v-toolbar-title>{{ $t('hello.world') }}</v-toolbar-title>
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

      <v-main class="d-flex align-center justify-left" style="min-height: 300px;">
          <slot />
      </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

const { locale } = useI18n()

const drawer = ref(true)

const items = [
  { text: 'My Files', icon: 'mdi-folder' },
  { text: 'Shared with me', icon: 'mdi-account-multiple' },
  { text: 'Starred', icon: 'mdi-star' },
  { text: 'Recent', icon: 'mdi-history' },
  { text: 'Offline', icon: 'mdi-check-circle' },
  { text: 'Uploads', icon: 'mdi-upload' },
  { text: 'Backups', icon: 'mdi-cloud-upload' },
]

</script>