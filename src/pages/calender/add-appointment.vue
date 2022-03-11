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
      <div class="swa-add-section">
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
        <q-btn color="primary" class="full-width" label="Speichern" @click="refresh()" icon="done" />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "add-appointment",
  components: {
    MainApp
  },
  data () {
    return {
      showBackButton: true,
      prevStep: "appointment-overview",
      pageName: "Termin hinzufügen",
      showAddButton: false,
      title:"",
      content:"",
      category: "",
      categories: [
        "Testspiel", "Pflichtspiel", "Training"
      ],
      date: "",
      dateTime: "",
      team: null,
      teams: [
        "1. Herren", "2. Herren", "A-Jugend", "B-Jugend"
      ],
      field: null,
      fields: [
        "A-Platz", "B-Platz"
      ]
    }
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        console.log("refresh", this.date, this.dateTime)
        done()
      }, 1000)
    },
    setNow(){}
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
