<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Club Manager </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Hauptmenü
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/home'
  },
  {
    title: 'Platzverwaltung',
    caption: 'Verwalte die verfügbaren Plätze',
    icon: 'stadium',
    link: '/fields'
  },
  {
    title: 'Schwarzes Brett',
    caption: 'Informiere deine Mannschaft.',
    icon: 'dashboard',
    link: '/bulletin-board'
  },
  {
    title: 'Kalender',
    caption: 'Informiere deine Mannschaft.',
    icon: 'event',
    link: '/calender'
  }
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="scss">
.swa-menu-body {

}

</style>
