<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :addSomething="addSomething"
    :showAddButton="showAddButton"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh
      @refresh="refresh"
    >
      <div class="swa-edit-section">
        <q-card class="swa-card" flat>
          <q-card-section horizontal>
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" class="col">
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

        <q-input
          outlined
          v-model="name"
          label="Name *"
        />

        <q-input
          outlined
          v-model="underground"
          label="Untergrund"
        />

        <q-input
          outlined
          v-model="seats"
          label="Sitzplätze"
        />
        <q-input
          outlined
          v-model="standingPlaces"
          label="Stehplätze"
        />

        <q-input
          outlined
          v-model="street"
          label="Straße"
        />

        <q-input
          outlined
          v-model="plz"
          label="PLZ"
        />

        <q-input
          outlined
          v-model="city"
          label="Stadt"
        />

        <q-btn color="primary" class="full-width" label="Speichern" @click="editField" icon="done" />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "edit-field",
  components: {
    MainApp
  },
  data () {
    return {
      showBackButton: true,
      prevStep: "fields-overview",
      pageName: "Platz bearbeiten",
      addSomething: "",
      showAddButton: false,
      active: true,
      seats: 1000,
      standingPlaces: 500,
      name: "A-Platz",
      street: "HEEGSTRAUCHWEG 3",
      underground: "Kunstrasen",
      plz: "35394",
      city: "GIESSEN",
    }
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        console.log("refresh")
        done()
      }, 1000)
    },

    editField () {
      this.showEditNotify()
      this.$router.push({ name: 'fields-overview' })
    },

    showEditNotify () {
      this.$q.notify({
        message: `Der Platz wurde erfolgreich aktualisiert.`,
        icon: 'done',
        color: 'green',
        position: 'top'
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
