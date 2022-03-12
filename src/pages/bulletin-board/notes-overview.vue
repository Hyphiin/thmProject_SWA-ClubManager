<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :addSomething="addSomething"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh @refresh="refresh">
      <div v-for="(note, i) in notes" :key="`noteNumber_${i}`">
        <q-card bordered class="swa-card">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ note.title }}</div>
                <div class="text-subtitle2">von {{ note.creatorID }}</div>
              </div>
              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable @click="getNote(note.id)">
                        <q-item-section>Bearbeiten</q-item-section>
                      </q-item>
                      <q-item clickable @click="confirmDelete(note.id)">
                        <q-item-section>Löschen</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            {{ note.content }}
          </q-card-section>

          <q-separator v-show="note.comments.length !== 0" />
          <q-card-section v-show="note.comments.length !== 0">
            <div
              v-for="(comment, i) in note.comments"
              :key="`commentNumber_${i}`"
            >
              <q-chat-message
                :name="comment.author"
                :text="[comment.text]"
                :sent="false"
              />
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-input
              borderless
              dense
              placeholder="Schreibe einen Kommentar."
              v-model="newComment"
            >
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="send"
                  @click="addNewComment(note.id)"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
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
  <q-dialog v-model="editNote" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="swa-edit-section">
          <div class="swa-edit-section">
            <q-input outlined v-model="title" label="Titel *" />

            <q-input v-model="content" outlined autogrow />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Abbrechen" color="primary" v-close-popup />
        <q-btn
          flat
          label="Speichern"
          color="primary"
          @click="editNoteFunction(noteId, title, content)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import MainApp from "pages/MainApp";
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
  },
  setup() {
    const showBackButton = ref(true);
    const prevStep = ref("PageIndex");
    const pageName = ref("Schwarzes Brett");
    const addSomething = ref("add-note");

    const notes = ref([]);
    const user = ref(auth.currentUser.uid);
    const newComment = ref("");

    const editNote = ref(false);
    const title = ref("");
    const creator = ref("");
    const content = ref("");
    const noteId = ref("");

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
        console.log(doc.id, " => ", doc.data().title);
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
        console.log(doc2.id, " => ", doc2.data().text);
        console.log(noteID, doc2.data().noteID);
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

    const addNewComment = async (noteID) => {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "comments"), {
        author: user.value,
        text: newComment.value,
        noteID: noteID,
        timestamp: Date.now(),
      })
        .then(() => {
          newComment.value = "";
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

    const getNote = async (id) => {
      const note = doc(db, "bulletin-boards", id);

      const docSnap = await getDoc(note);

      console.log(docSnap);

      editNote.value = true;

      noteId.value = docSnap.id;
      title.value = docSnap.data().title;
      creator.value = docSnap.data().creatorID;
      content.value = docSnap.data().content;
    };

    const editNoteFunction = async (id, title, content) => {
      const note = doc(db, "bulletin-boards", id);
      const currentUser = auth.currentUser.uid;

      if (currentUser === creator.value) {
        await updateDoc(note, {
          title: title,
          content: content,
          creatorID: creator.value,
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

    onMounted(() => {
      getNotes();
    });
    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      newComment,
      editNote,
      title,
      content,
      noteId,
      notes,
      refresh,
      addNewComment,
      loadOlderNews,
      confirmDelete,
      getNote,
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
