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

    <!--    <q-drawer ref="leftDrawer"
    v-model="leftDrawerOpen"
    >
      <div class="toolbar light">
        <q-toolbar-title :padding="1">
          Menü
        </q-toolbar-title>
      </div>

      <div class="swa-menu-body">
        <q-item clickable to="/fields">
          <q-item-section avatar>
            <q-icon color="negative" name="delete" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Platzverwaltung</q-item-label>
            <q-item-label caption>Verwalte die verfügbaren Plätze</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>-->
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

    <!--    <q-footer elevated>
      <q-tabs
        dense
        no-caps
        align="justify"
        narrow-indicator
        active-color="primary"
        indicator-color="bg-white"
      >
        <q-route-tab
          icon="shopping_bag"
          :to="{name: 'products'}"
          label="Produkte"
        />
        <q-route-tab
          icon="category"
          :to="{name: 'categories'}"
          label="Kategorie"
        />
        <q-route-tab
          icon="supervisor_account"
          :to="{name: 'customers'}"
          label="Kunden"
        />
        <q-route-tab
          icon="list"
          :to="{name: 'orders'}"
          label="Bestellungen"
        />
      </q-tabs>
    </q-footer>-->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { getAuth, signOut } from "firebase/auth";

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
    title: "Mannschaften",
    caption: "Verwalte deine Mannschaften.",
    icon: "groups",
    link: "/fields",
  },
  {
    title: "Schwarzes Brett",
    caption: "Informiere deine Mannschaft.",
    icon: "dashboard",
    link: "/fields",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const logoutUser = () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Erfolgreich ausgeloggt!");
        })
        .catch((error) => {
          // An error happened.
          console.log("Prozess ist fehlgeschlagen!", error);
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
