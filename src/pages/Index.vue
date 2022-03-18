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
              :creator-id="note.author"
              :title="note.title"
              :content="note.content"
              :comments="[]"
              :comment-mode="false"
            />
          </div>
        </div>

        <div class="swa-appointment">
          <h2>Die nächsten Termine</h2>
          <div
            v-for="(appointment, i) in appointments"
            :key="`appointNumber_${i}`"
            @click="seeAppointments"
          >
            <appointment
              :id="appointment.id"
              :author="appointment.data.author"
              :content="appointment.data.content"
              :category="appointment.data.category"
              :field="appointment.data.field"
              :team="appointment.data.team"
              :timestamp="appointment.data.timestamp"
              :title="appointment.data.title"
              :fields="fields"
              :teams="teams"
              :categories="categories"
            />
          </div>
        </div>
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import MainApp from "pages/MainApp";
import Note from "pages/bulletin-board/note.vue";
import Appointment from "pages/calender/appointment.vue";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "src/boot/firebase";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageIndex",
  components: {
    MainApp,
    Note,
    Appointment,
  },
  setup() {
    const showBackButton = ref(false);
    const prevStep = ref("PageIndex");
    const pageName = ref("Home");
    const addSomething = ref("");
    const showAddButton = ref(false);

    const notes = ref([]);
    const appointments = ref([]);

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

    const categories = ref(["Testspiel", "Pflichtspiel", "Training"]);
    const teams = ref(["1. Herren", "2. Herren", "A-Jugend", "B-Jugend"]);
    const fields = ref(["A-Platz", "B-Platz"]);

    const getAppointments = async () => {
      appointments.value = [];
      const querySnapshot = await getDocs(
        query(collection(db, "calender"), orderBy("timestamp"), limit(2))
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        appointments.value.push({ id: doc.id, data: doc.data() });
      });

      console.log(appointments.value);
    };

    const seeBoards = () => {
      router.replace({ name: "notes-overview" });
    };

    const seeAppointments = () => {
      router.replace({ name: "appointment-overview" });
    };

    onMounted(async () => {
      await getNote();
      await getAppointments();
    });
    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      showAddButton,
      notes,
      appointments,
      refresh,
      seeBoards,
      categories,
      teams,
      fields,
      getAppointments,
      seeAppointments,
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
