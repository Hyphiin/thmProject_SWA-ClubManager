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
      <div class="swa-home-section">
        <div class="swa-board">
          <h2>Letzter Eintrag Schwarzes Brett</h2>
          <div
            v-for="(note, i) in notes"
            :key="`noteNumber_${i}`"
            @click="seeBoards"
          >
            <Note
              :id="note.id"
              :creator-id="note.creatorID"
              :title="note.title"
              :content="note.content"
              :comments="[]"
              :comment-mode="false"
            />
          </div>
        </div>

        <div class="swa-appointment">
          <h2>Die nächsten Termine</h2>
          <q-card class="swa-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Testspiel 02.03.2022</div>
              <div class="text-subtitle2">@ 2. Herren</div>
            </q-card-section>
            <q-separator dark />

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat>Action 1</q-btn>
              <q-btn flat>Action 2</q-btn>
            </q-card-actions>
          </q-card>

          <q-card class="swa-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Testspiel 03.03.2022</div>
              <div class="text-subtitle2">@ E-Jugend</div>
            </q-card-section>
            <q-separator dark />

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat>Action 1</q-btn>
              <q-btn flat>Action 2</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import MainApp from "pages/MainApp";
import Note from "pages/bulletin-board/note.vue";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "src/boot/firebase";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageIndex",
  components: {
    MainApp,
    Note,
  },
  setup() {
    const showBackButton = ref(false);
    const prevStep = ref("PageIndex");
    const pageName = ref("Home");
    const addSomething = ref("");
    const showAddButton = ref(false);

    const notes = ref([]);

    const router = useRouter();

    const refresh = (done) => {
      setTimeout(() => {
        getNotes();
        console.log("refresh");
        done();
      }, 1000);
    };

    const getNote = async () => {
      notes.value = [];
      const querySnapshot = await getDocs(
        query(collection(db, "bulletin-boards"), orderBy("timestamp"), limit(1))
      );
      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc);
        notes.value.push({
          id: doc.id,
          title: doc.data().title,
          author: doc.data().creatorID,
          content: doc.data().content,
          comments: [],
        });
      });
    };

    const seeBoards = () => {
      router.replace({ name: "notes-overview" });
    };

    onMounted(async () => {
      await getNote();
    });
    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      showAddButton,
      notes,
      refresh,
      seeBoards,
    };
  },
});
</script>

<style lang="scss">
.swa-home-section {
  h2 {
    font-size: 1rem;
    line-height: 1.1rem;
    font-weight: bold;
  }
}
</style>
