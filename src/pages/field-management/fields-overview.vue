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
          <q-item clickable @click="getField(el.id)">
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
        <q-dialog v-model="editField" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <div class="swa-edit-section">
                <q-card class="swa-card" flat>
                  <q-card-section horizontal>
                    <q-img
                      src="https://cdn.quasar.dev/img/parallax2.jpg"
                      class="col"
                    >
                      <div class="absolute-bottom text-h6">
                        {{ name }}
                      </div>
                    </q-img>

                    <q-card-actions vertical class="justify-around">
                      <q-btn flat round color="primary" icon="edit" />
                      <q-btn flat round color="negative" icon="delete" />
                    </q-card-actions>
                  </q-card-section>
                </q-card>

                <q-toggle
                  size="lg"
                  v-model="active"
                  checked-icon="check"
                  color="primary"
                  label="Belegbarer Platz"
                  unchecked-icon="clear"
                />

                <q-input outlined v-model="name" label="Name *" />

                <q-input outlined v-model.number="seat" label="Sitzplätze" />
                <q-input
                  outlined
                  v-model.number="standingRoom"
                  label="Stehplätze"
                />

                <q-input outlined v-model="street" label="Straße" />

                <q-input outlined v-model="plz" label="PLZ" />

                <q-input outlined v-model="city" label="Stadt" />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Abbrechen" color="primary" v-close-popup />
              <q-btn
                flat
                label="Speichern"
                color="primary"
                @click="
                  editFieldFunction(
                    fieldId,
                    name,
                    seat,
                    standingRoom,
                    street,
                    plz,
                    city
                  )
                "
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "src/boot/firebase";
import { Notify } from "quasar";
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

    const editField = ref(false);

    const fields = ref([]);

    const fieldId = ref();
    const name = ref("");
    const seat = ref(0);
    const standingRoom = ref(0);
    const street = ref("");
    const plz = ref("");
    const city = ref("");
    const active = ref(false);

    const user = ref("");

    const getFields = async () => {
      fields.value = [];
      const querySnapshot = await getDocs(collection(db, "fields"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().title);
        fields.value.push({ id: doc.id, data: doc.data() });
      });
    };

    const getField = async (id) => {
      const field = doc(db, "fields", id);

      const docSnap = await getDoc(field);

      console.log(docSnap);

      editField.value = true;

      fieldId.value = docSnap.id;
      name.value = docSnap.data().title;
      seat.value = docSnap.data().seats;
      standingRoom.value = docSnap.data().standingRoom;
      street.value = docSnap.data().street;
      plz.value = docSnap.data().plz;
      city.value = docSnap.data().city;
      user.value = docSnap.data().user;
    };

    const confirmDelete = async (id) => {
      await deleteDoc(doc(db, "fields", id))
        .then(() => {
          Notify.create({
            message: "Plan erfolgreich gelöscht!",
            color: "positive",
            position: "top",
          });
          getFields();
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

    const editFieldFunction = async (
      id,
      name,
      seat,
      standingRoom,
      street,
      plz,
      city
    ) => {
      const field = doc(db, "fields", id);
      const currentUser = auth.currentUser.uid;

      await updateDoc(field, {
        title: name,
        seats: seat,
        standingRoom: standingRoom,
        street: street,
        plz: plz,
        city: city,
        user: user.value,
        edited: currentUser,
      })
        .then(() => {
          Notify.create({
            message: "Plan erfolgreich editiert!",
            color: "positive",
            position: "top",
          });
          getFields();
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

    onMounted(() => {
      getFields();
    });

    return {
      showBackButton,
      prevStep,
      pageName,
      addSomething,
      editField,
      fields,
      getField,
      fieldId,
      name,
      seat,
      standingRoom,
      street,
      plz,
      city,
      active,
      confirmDelete,
      editFieldFunction,
      refresh,
    };
  },
});
</script>

<style lang="scss" scoped>
.swa-edit-section {
  min-width: 75vw;
}
</style>
