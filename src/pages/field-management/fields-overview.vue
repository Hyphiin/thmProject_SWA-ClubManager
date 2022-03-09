<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :addSomething="addSomething"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh @refresh="refresh">
      <q-card v-for="el in fields" :key="el.id" class="swa-card">
        <q-img
          :ratio="16 / 9"
          src="https://img.archiexpo.de/images_ae/photo-mg/89030-11620362.webp"
        >
          <div class="absolute-bottom text-h6">{{ el.data.title }}</div>
        </q-img>

        <q-list>
          <q-item clickable to="/fields/edit-field">
            <q-item-section avatar>
              <q-icon color="primary" name="edit" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Platz bearbeiten</q-item-label>
              <q-item-label caption>Ändere die Angaben zum Platz.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="schedule" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Trainingszeiten</q-item-label>
              <q-item-label caption
                >Weise den Teams Trainigszeiten auf den Plätzen zu</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item clickable @click="confirmDelete(el.id)">
            <q-item-section avatar>
              <q-icon color="negative" name="delete" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Platz löschen</q-item-label>
              <q-item-label caption>Lösche diesen Platz</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
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
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "src/boot/firebase";
import MainApp from "pages/MainApp";

export default defineComponent({
  name: "fields-overview",
  components: {
    MainApp,
  },
  setup(props, context) {
    const showBackButton = true;
    const prevStep = "PageIndex";
    const pageName = "Platzverwaltung";
    const addSomething = "add-field";

    const alert = ref(false);
    const alertMessage = ref("");

    const fields = ref([]);

    const getFields = async () => {
      fields.value = [];
      const querySnapshot = await getDocs(collection(db, "fields"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().title);
        fields.value.push({ id: doc.id, data: doc.data() });
      });
    };

    const confirmDelete = async (id) => {
      await deleteDoc(doc(db, "fields", id))
        .then(() => {
          alert.value = true;
          alertMessage.value = "Plan erfolgreich gelöscht!";
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
      console.log("Dokument erfolgreich entfernt!");
    };

    const refresh = (done) => {
      setTimeout(() => {
        console.log("refresh");
        done();
      }, 1000);
    };

    onMounted(() => {
      getFields();
    });

    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      alert,
      alertMessage,
      fields,
      confirmDelete,
      refresh,
    };
  },
});
</script>

<style scoped></style>
