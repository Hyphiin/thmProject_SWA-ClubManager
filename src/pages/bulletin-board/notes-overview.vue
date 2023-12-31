<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :addSomething="addSomething"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh v-if="notes.length > 0" @refresh="refresh">
      <div v-for="(note, i) in notes" :key="`noteNumber_${i}`">
        <Note
          :id="note.id"
          :creator-Id="note.author"
          :title="note.title"
          :content="note.content"
          :comments="note.comments"
          :comment-mode="true"
          @confirm-delete="confirmDelete($event)"
          @add-new-comment="addNewComment($event)"
          @edit-note="editNoteFunction($event)"
        />
      </div>
      <div v-show="notes.length >= 5" class="swa-load-older">
        <q-btn
          color="primary"
          flat
          icon-right="autorenew"
          label="Lade ältere Nachrichten"
          @click="loadOlderNews"
        />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import MainApp from "pages/MainApp";
import Note from "pages/bulletin-board/note.vue";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "src/boot/firebase";
import { Notify } from "quasar";

export default defineComponent({
  name: "notes-overview",
  components: {
    MainApp,
    Note,
  },
  setup() {
    const showBackButton = ref(true);
    const prevStep = ref("PageIndex");
    const pageName = ref("Schwarzes Brett");
    const addSomething = ref("add-note");

    const notes = ref([]);
    const user = ref(auth.currentUser.uid);

    const creator = ref("");

    const refresh = (done) => {
      setTimeout(() => {
        getNotes();
        console.log("refresh");
        done();
      }, 1000);
    };

    const loadOlderNews = () => {
      console.log(this.notes);
    };

    const getNotes = async () => {
      notes.value = [];
      const querySnapshot = await getDocs(
        query(collection(db, "bulletin-boards"), orderBy("timestamp"))
      );
      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        const comments = await getComments(doc.id);
        notes.value.push({
          id: doc.id,
          title: doc.data().title,
          author: doc.data().creatorID,
          content: doc.data().content,
          comments: comments,
        });
      });
    };

    const getComments = async (noteID) => {
      const querySnapshot2 = await getDocs(
        query(collection(db, "comments"), orderBy("timestamp"))
      );

      const comments = [];
      querySnapshot2.forEach((doc2) => {
        // doc.data() is never undefined for query doc snapshots
        if (noteID === doc2.data().noteID) {
          comments.push({
            text: doc2.data().text,
            timestamp: doc2.data().timestamp,
            author: doc2.data().author,
          });
        }
      });
      return comments;
    };

    const addNewComment = async (temp) => {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "comments"), {
        author: user.value,
        text: temp.comment,
        noteID: temp.id,
        timestamp: Date.now(),
      })
        .then(() => {
          getNotes();
          Notify.create({
            message: "Kommentar erfolgreich hinzugefügt!",
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

    const confirmDelete = async (id) => {
      await getNote(id);
      const currentUser = auth.currentUser.uid;
      if (creator.value === currentUser) {
        await deleteDoc(doc(db, "bulletin-boards", id))
          .then(async () => {
            Notify.create({
              message: "Plan erfolgreich gelöscht!",
              color: "positive",
              position: "top",
            });
            const comments = await getDocs(
              query(collection(db, "comments"), where("noteID", "==", id))
            );
            comments.forEach(async (comment) => {
              await deleteDoc(doc(db, "comments", comment.id));
            });

            getNotes();
          })
          .catch((error) => {
            console.log(error);
            Notify.create({
              message: "Fehlgeschlagen!",
              color: "negative",
              position: "top",
            });
          });
      } else {
        Notify.create({
          message: "Sie sind nicht der Urheber!",
          color: "negative",
          position: "top",
        });
      }
    };

    const editNoteFunction = async (temp) => {
      const note = doc(db, "bulletin-boards", temp.id);
      const currentUser = auth.currentUser.uid;
      if (currentUser === temp.creatorId) {
        await updateDoc(note, {
          title: temp.title,
          content: temp.content,
          creatorID: temp.creatorId,
          edited: Date.now(),
        })
          .then(() => {
            Notify.create({
              message: "Notiz erfolgreich editiert!",
              color: "positive",
              position: "top",
            });
            getNotes();
          })
          .catch((error) => {
            console.log(error);
            Notify.create({
              message: "Fehlgeschlagen!",
              color: "negative",
              position: "top",
            });
          });
      } else {
        Notify.create({
          message: "Sie sind nicht der Urheber!",
          color: "negative",
          position: "top",
        });
      }
    };

    onMounted(async () => {
      await getNotes();
    });
    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      notes,
      refresh,
      addNewComment,
      loadOlderNews,
      confirmDelete,
      editNoteFunction,
    };
  },
});
</script>

<style lang="scss" scoped>
.swa-edit-section {
  min-width: 75vw;
}
</style>
