<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :showAddButton="showAddButton"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh @refresh="refresh">
      <div class="swa-add-section">
        <q-input outlined v-model="title" label="Titel *" />

        <q-input v-model="content" outlined autogrow label="Beschreibung" />

        <q-select outlined v-model="team" :options="teams" label="Mannschaft" />

        <q-select
          outlined
          v-model="category"
          :options="categories"
          label="Kategorie"
        />

        <q-select outlined v-model="field" :options="fields" label="Platz" />

        <div>
          <div class="swa-new-appointment-date">
            <q-date
              v-model="date"
              mask="YYYY-MM-DD"
              color="primary"
              today-btn
            />
          </div>
          <div class="swa-new-appointment-time">
            <q-time
              v-model="dateTime"
              mask="HH:mm"
              color="primary"
              now-btn
              format24h
            />
          </div>
        </div>
        <q-btn
          color="primary"
          class="full-width"
          label="Speichern"
          icon="done"
          @click="addCalender"
        />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import MainApp from "pages/MainApp";
import { Notify } from "quasar";
import { auth, db } from "src/boot/firebase";

export default defineComponent({
  name: "field-assignment",
  components: {
    MainApp,
  },
  setup() {
    const showBackButton = ref(true);
    const prevStep = ref("fields-overview");
    const pageName = ref("Platzbelegung hinzufügen");
    const showAddButton = ref(false);

    const title = ref("");
    const content = ref("");
    const category = ref("");
    const categories = ref(["Testspiel", "Pflichtspiel", "Training"]);
    const date = ref("");
    const dateTime = ref("");
    const team = ref(null);
    const teams = ref(["1. Herren", "2. Herren", "A-Jugend", "B-Jugend"]);
    const field = ref(null);
    const fields = ref(["A-Platz", "B-Platz"]);

    const user = ref(auth.currentUser.uid);

    const getFields = async () => {
      fields.value = [];
      const querySnapshot = await getDocs(collection(db, "fields"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fields.value.push(doc.data().title);
      });
    };

    const addCalender = async () => {
      // Add a new document with a generated id.
      let timestamp = new Date(date.value + " " + dateTime.value);

      const docRef = await addDoc(collection(db, "calender"), {
        title: title.value,
        content: content.value,
        category: category.value,
        team: team.value,
        field: field.value,
        timestamp: timestamp,
        author: user.value,
      })
        .then(() => {
          title.value = "";
          content.value = "";
          category.value = "";
          team.value = "";
          field.value = "";
          date.value = "";
          dateTime.value = "";
          Notify.create({
            message: "Termin erfolgreich hinzugefügt!",
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

    const refresh = (done) => {
      setTimeout(() => {
        console.log("refresh");
        getFields();
        done();
      }, 1000);
    };

    onMounted(async () => {
      await getFields();
    });
    return {
      showBackButton,
      prevStep,
      pageName,
      showAddButton,
      title,
      content,
      category,
      categories,
      date,
      dateTime,
      team,
      teams,
      field,
      fields,
      addCalender,
      refresh,
    };
  },
});
</script>

<style lang="scss"></style>
