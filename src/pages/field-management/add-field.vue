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
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ alertMessage }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { collection, addDoc } from "firebase/firestore";
import { db } from "src/boot/firebase";
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

    const alert = ref(false);
    const alertMessage = ref("");

    const addField = async () => {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "fields"), {
        title: name.value,
        seats: seats.value,
        standingRoom: standingPlaces.value,
      })
        .then(() => {
          alert.value = true;
          alertMessage.value = "Plan erfolgreich hinzugefügt!";
          setTimeout(() => {
            alert.value = false;
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          alert.value = true;
          alertMessage.value = "Fehlgeschlagen :(";
          setTimeout(() => {
            alert.value = false;
          }, 5000);
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
      alert,
      alertMessage,
      addField,
    };
  },
});
</script>

<style scoped></style>
