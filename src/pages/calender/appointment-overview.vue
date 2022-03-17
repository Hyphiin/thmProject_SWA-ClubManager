<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :addSomething="addSomething"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh @refresh="refresh">
      <div
        v-for="(appointment, i) in this.appointments"
        :key="`appointNumber_${i}`"
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
          :categorys="categorys"
          @confirm-delete="confirmDelete($event)"
          @edit-appointment="editAppointmentFunction($event)"
        />
      </div>
      <div v-show="appointments.length >= 5" class="swa-load-older">
        <q-btn
          color="primary"
          flat
          icon-right="autorenew"
          label="Lade ältere Termine"
          @click="loadOlderAppointments()"
        />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import MainApp from "pages/MainApp";
import { Notify } from "quasar";
import { auth, db } from "src/boot/firebase";
import Appointment from "./appointment.vue";

export default defineComponent({
  name: "appointment-overview",
  components: {
    MainApp,
    Appointment,
  },
  setup() {
    const showBackButton = ref(true);
    const prevStep = ref("PageIndex");
    const pageName = ref("Kalender");
    const addSomething = ref("add-appointment");
    const tab = ref("detail");
    const appointments = ref([]);

    //  [
    //   {
    //     title: "Testspiel gegen Buseck",
    //     content: "Treffen eine Stunde früher.",
    //     category: "Testspiel",
    //     date: "2022-04-02",
    //     dateTime: "12:30",
    //     team: "1. Herren",
    //     field: "A-Platz",
    //     commitments: 1,
    //     cancellation: null,
    //   },
    //   {
    //     title: "Pflichtspiel gegen Buseck",
    //     content: "Treffen eine Stunde früher.",
    //     category: "Pflichtspiel",
    //     date: "2022-04-02",
    //     dateTime: "12:30",
    //     team: "1. Herren",
    //     field: "A-Platz",
    //   },
    //   {
    //     title: "Training",
    //     content: "Pünkltich sein!!",
    //     category: "Training",
    //     date: "2022-04-02",
    //     dateTime: "12:30",
    //     team: "1. Herren",
    //     field: "A-Platz",
    //   },
    //   {
    //     title: "Pflichtspiel gegen Buseck",
    //     content: "Treffen eine Stunde früher.",
    //     category: "Pflichtspiel",
    //     date: "2022-04-02",
    //     dateTime: "12:30",
    //     team: "A-Jugend",
    //     field: "A-Platz",
    //   },
    //   {
    //     title: "Testspiel gegen Reiskirchen",
    //     content: "Treffen eine Stunde früher.",
    //     category: "Testspiel",
    //     date: "2022-04-02",
    //     dateTime: "12:30",
    //     team: "2. Herren",
    //     field: "B-Platz",
    //   },
    // ]

    const getAppointments = async () => {
      appointments.value = [];
      const querySnapshot = await getDocs(
        query(collection(db, "calender"), orderBy("timestamp"))
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        appointments.value.push({ id: doc.id, data: doc.data() });
      });
    };

    const categories = ref(["Testspiel", "Pflichtspiel", "Training"]);
    const teams = ref(["1. Herren", "2. Herren", "A-Jugend", "B-Jugend"]);
    const fields = ref(["A-Platz", "B-Platz"]);

    const confirmDelete = async (id) => {
      await deleteDoc(doc(db, "calender", id))
        .then(() => {
          Notify.create({
            message: "Termin erfolgreich gelöscht!",
            color: "positive",
            position: "top",
          });
          getAppointments();
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

    const editAppointmentFunction = async (temp) => {
      console.log(temp.date, temp.dateTime);
      // Date ist noch falsch
      const appointment = doc(db, "calender", temp.id);
      const currentUser = auth.currentUser.uid;
      if (currentUser === temp.author) {
        await updateDoc(appointment, {
          title: temp.title,
          content: temp.content,
          category: temp.category,
          field: temp.field,
          team: temp.team,
          author: temp.author,
          timestamp: new Date(temp.date + "T" + temp.dateTime + ":00"),
          edited: currentUser,
        })
          .then(() => {
            Notify.create({
              message: "Termin erfolgreich editiert!",
              color: "positive",
              position: "top",
            });
            getAppointments();
          })
          .catch((error) => {
            console.log(error);
            Notify.create({
              message: "Fehlgeschlagen!",
              color: "negative",
              position: "top",
            });
          });
      }
    };

    const refresh = (done) => {
      setTimeout(() => {
        console.log("refresh");
        getFields();
        done();
      }, 1000);
    };

    onMounted(() => {
      getAppointments();
    });

    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      tab,
      appointments,
      teams,
      categories,
      fields,
      confirmDelete,
      editAppointmentFunction,
      refresh,
    };
  },
});
</script>

<style lang="scss">
.q-tab-panel {
  padding: 0;
}

.swa-vote .q-icon {
  margin-right: 0.3rem;
}
</style>
