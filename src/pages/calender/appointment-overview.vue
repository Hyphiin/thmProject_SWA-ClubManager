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
          :author="appointment.author"
          :content="appointment.content"
          :category="appointment.category"
          :field="appointment.field"
          :team="appointment.team"
          :timestamp="appointment.timestamp"
          :title="appointment.title"
          @get-appointment="getAppointment($event)"
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
import { defineComponent } from "@vue/runtime-core";
import MainApp from "pages/MainApp";
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
    const events = ref(this.appointments);

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
      // fields.value = [];
      // const querySnapshot = await getDocs(collection(db, "fields"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   fields.value.push({ id: doc.id, data: doc.data() });
      // });
    };

    const getAppointment = async (id) => {
      // const field = doc(db, "fields", id);
      // const docSnap = await getDoc(field);
      // editField.value = true;
      // fieldId.value = docSnap.id;
      // name.value = docSnap.data().title;
      // seat.value = docSnap.data().seats;
      // standingRoom.value = docSnap.data().standingRoom;
      // street.value = docSnap.data().street;
      // plz.value = docSnap.data().plz;
      // city.value = docSnap.data().city;
      // user.value = docSnap.data().user;
    };

    const confirmDelete = async (id) => {
      await deleteDoc(doc(db, "calender", id))
        .then(() => {
          Notify.create({
            message: "Plan erfolgreich gelöscht!",
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

    const editAppointmentFunction = async (
      id,
      name,
      seat,
      standingRoom,
      street,
      plz,
      city
    ) => {
      // const field = doc(db, "fields", id);
      // const currentUser = auth.currentUser.uid;
      // await updateDoc(field, {
      //   title: name,
      //   seats: seat,
      //   standingRoom: standingRoom,
      //   street: street,
      //   plz: plz,
      //   city: city,
      //   user: user.value,
      //   edited: currentUser,
      // })
      //   .then(() => {
      //     Notify.create({
      //       message: "Plan erfolgreich editiert!",
      //       color: "positive",
      //       position: "top",
      //     });
      //     getFields();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     Notify.create({
      //       message: "Fehlgeschlagen!",
      //       color: "negative",
      //       position: "top",
      //     });
      //   });
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
      events,
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
