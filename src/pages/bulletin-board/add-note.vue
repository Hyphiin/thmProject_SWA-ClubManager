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

        <q-input v-model="content" outlined autogrow />

        <q-btn
          color="primary"
          class="full-width"
          label="Speichern"
          icon="done"
          @click="addBoard"
        />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import MainApp from "pages/MainApp";
import { Notify } from "quasar";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "src/boot/firebase";

export default defineComponent({
  name: "add-note",
  components: {
    MainApp,
  },
  setup() {
    const showBackButton = ref(true);
    const prevStep = ref("notes-overview");
    const pageName = ref("Notiz schreiben");
    const showAddButton = ref(false);
    const title = ref("");
    const content = ref("");
    const user = ref(auth.currentUser.uid);

    const refresh = (done) => {
      setTimeout(() => {
        console.log("refresh");
        done();
      }, 1000);
    };

    const addBoard = async () => {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "bulletin-boards"), {
        title: title.value,
        content: content.value,
        creatorID: user.value,
        timestamp: Date.now(),
      })
        .then(() => {
          title.value = "";
          content.value = "";
          Notify.create({
            message: "Board erfolgreich hinzugefügt!",
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
      showAddButton,
      title,
      content,
      refresh,
      addBoard,
    };
  },
});
</script>

<style scoped></style>
