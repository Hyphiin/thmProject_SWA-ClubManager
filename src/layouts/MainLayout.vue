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
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Hauptmenü </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-btn
          :to="{ name: '' }"
          color="primary"
          text-color="white"
          label="Logout"
          @click="logoutUser()"
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
import { useRouter } from "vue-router";
import EssentialLink from "components/EssentialLink.vue";
import { getAuth, signOut } from "firebase/auth";
import { Notify } from "quasar";

const linksList = [
  {
    title: "Home",
    icon: "home",
    link: "/home",
  },
  {
    title: "Platzverwaltung",
    caption: "Verwalte die verfügbaren Plätze",
    icon: "stadium",
    link: "/fields",
  },
  {
    title: "Schwarzes Brett",
    caption: "Informiere deine Mannschaft.",
    icon: "dashboard",
    link: "/bulletin-board",
  },
  {
    title: "Kalender",
    caption: "Informiere deine Mannschaft.",
    icon: "event",
    link: "/calender",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const router = useRouter();

    const logoutUser = () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Erfolgreich ausgeloggt!");
          router.push({ name: "login" });
          Notify.create({
            message: `Auf Wiedersehen!`,
            color: "positive",
            position: "top",
          });
        })
        .catch((error) => {
          // An error happened.
          Notify.create({
            message: `${error}`,
            color: "positive",
            position: "top",
          });
        });
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logoutUser,
    };
  },
});
</script>

<style lang="scss">
.swa-menu-body {
}
</style>
