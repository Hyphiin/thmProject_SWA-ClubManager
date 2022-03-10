<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :addSomething="addSomething"
    :showAddButton="showAddButton"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh @refresh="refresh">
      <div class="swa-add-section">
        <q-input outlined v-model="name" label="Name *" />

        <q-file outlined v-model="file" counter max-files="1">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <q-toggle
          size="lg"
          v-model="active"
          checked-icon="check"
          color="primary"
          label="Belegbarer Platz"
          unchecked-icon="clear"
        />

        <q-input
          outlined
          v-model.number="seats"
          label="Sitzplätze"
          type="number"
        />

        <q-input
          outlined
          v-model.number="standingPlaces"
          label="Stehplätze"
          type="number"
        />

        <q-btn
          color="primary"
          class="full-width"
          label="Speichern"
          icon="done"
          @click="addField"
        />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { collection, addDoc } from "firebase/firestore";
import { db } from "src/boot/firebase";
import { Notify } from "quasar";
import MainApp from "pages/MainApp";

export default defineComponent({
  name: "add-field",
  components: {
    MainApp,
  },
  setup() {
    const showBackButton = true;
    const prevStep = "fields-overview";
    const pageName = "Platz hinzufügen";
    const addSomething = "";
    const showAddButton = false;
    const active = true;
    const seats = ref(0);
    const standingPlaces = ref(0);
    const name = ref("");
    const file = "";

    const addField = async () => {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "fields"), {
        title: name.value,
        seats: seats.value,
        standingRoom: standingPlaces.value,
      })
        .then(() => {
          name.value = "";
          seats.value = 0;
          standingPlaces.value = 0;
          Notify.create({
            message: "Plan erfolgreich hinzugefügt!",
            color: "positive",
            position: "top",
          });
        })
        .catch((error) => {
          console.log(error);
          Notify.create({
            message: "Fehlgeschlagen!",
            color: "negative",
            position: "top",
          });
        });
    };

    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      showAddButton,
      active,
      seats,
      standingPlaces,
      name,
      file,
      addField,
    };
  },
});
</script>

<style scoped></style>
