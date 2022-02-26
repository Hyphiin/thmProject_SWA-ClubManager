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
      <div class="swa-add-section">
        <q-input
          outlined
          v-model="name"
          label="Name *"
        />

        <q-file outlined v-model="file" counter max-files="1">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

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
          v-model="seats"
          label="Sitzplätze"
        />

        <q-input
          outlined
          v-model="standingPlaces"
          label="Stehplätze"
        />

        <q-btn color="primary" class="full-width" label="Speichern" icon="done" />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "add-field",

  components: {
    MainApp
  },
  data() {
    return {
      showBackButton: true,
      prevStep: "fields-overview",
      pageName: "Platz hinzufügen",
      addSomething: "",
      showAddButton: false,
      active: true,
      seats: '',
      standingPlaces: '',
      name: "",
      file: ""
    }
  }
}
</script>

<style scoped>

</style>
