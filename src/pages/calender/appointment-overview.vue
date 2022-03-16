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
        <q-card
          bordered
          class="swa-card"
          :class="[
            appointment.category === 'Testspiel' ? 'swa-test' : '',
            appointment.category === 'Pflichtspiel' ? 'swa-pflicht' : '',
          ]"
        >
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ appointment.title }}</div>
                <div class="text-h6">{{ appointment.date }}</div>
                <div class="text-h6">{{ appointment.dateTime }} Uhr</div>
                <div class="text-subtitle2">für {{ appointment.team }}</div>
                <div class="text-subtitle2">
                  auf dem {{ appointment.field }}
                </div>
              </div>
              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable :to="{ name: 'edit-appointment' }">
                        <q-item-section>Bearbeiten</q-item-section>
                      </q-item>
                      <q-item clickable @click="confirmDelete">
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
            {{ appointment.content }}
          </q-card-section>

          <q-separator />
          <div class="row swa-vote">
            <div class="col-6">
              <q-btn class="swa-cancel full-width" icon="thumb_down">{{
                appointment.cancellation
              }}</q-btn>
            </div>
            <div class="col-6">
              <q-btn class="swa-commitment full-width" icon="thumb_up">{{
                appointment.commitments
              }}</q-btn>
            </div>
          </div>
        </q-card>
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

export default defineComponent({
  name: "appointment-overview",
  components: {
    MainApp,
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
.swa-test {
  background-color: $primary;
  color: $white;
  .q-btn__content {
    color: $white;
  }
}

.swa-pflicht {
  background-color: $white;
  color: $primary;
  .q-btn__content {
    color: $primary;
  }
}

.swa-vote .q-icon {
  margin-right: 0.3rem;
}
</style>
