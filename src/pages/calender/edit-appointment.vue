<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :showAddButton="showAddButton"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh
      @refresh="refresh"
    >
      <div class="swa-edit-section">
        <q-input
          outlined
          v-model="title"
          label="Titel *"
        />

        <q-input
          v-model="content"
          outlined
          autogrow
          label="Beschreibung"
        />

        <q-select
          outlined
          v-model="team"
          :options="teams"
          label="Mannschaft"
        />

        <q-select
          outlined
          v-model="category"
          :options="categories"
          label="Kategorie"
        />

        <q-select
          outlined
          v-model="field"
          :options="fields"
          label="Platz"
        />

        <div>
          <div class="swa-new-appointment-date">
            <q-date
              v-model="date"
              mask="YYYY-MM-DD"
              color="primary"
              today-btn
            />
          </div>
          <div class="swa-new-appointment-time">
            <q-time
              v-model="dateTime"
              mask="HH:mm"
              color="primary"
              now-btn
              format24h
            />
          </div>
        </div>
        <q-btn color="primary" class="full-width" label="Speichern" icon="done" @click="refresh()"  />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "edit-appointment",
  components: {
    MainApp
  },
  data () {
    return {
      showBackButton: true,
      prevStep: "appointment-overview",
      pageName: "Termin bearbeiten",
      showAddButton: false,
      title:"Testspiel gegen Friedberg",
      content:"Lorem ipsum dolor sit amet",
      category: "Testspiel",
      categories: [
        "Testspiel", "Pflichtspiel", "Training"
      ],
      date: "2022-03-12",
      dateTime: "11:20",
      team: "1. Herren",
      teams: [
        "1. Herren", "2. Herren", "A-Jugend", "B-Jugend"
      ],
      field: "A-Platz",
      fields: [
        "A-Platz", "B-Platz"
      ]
    }
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        console.log("refresh")
        done()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.swa-new-appointment-time{
  display: flex;
  justify-content: center;
  margin-bottom: .5rem;
}
.swa-new-appointment-date{
  display: flex;
  justify-content: center;
  margin-bottom: .5rem;
}
</style>
