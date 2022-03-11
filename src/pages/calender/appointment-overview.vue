<template>
  <main-app
    :showBackButton="showBackButton"
    :prevStep="prevStep"
    :pageName="pageName"
    :addSomething="addSomething"
    class="swa-main-app-bracket"
  >
    <q-pull-to-refresh
      @refresh="refresh"
    >
      <div v-for="(appointment, i) in this.appointments" :key="`appointNumber_${i}`">
        <q-card bordered class="swa-card"
                :class="[appointment.category === 'Testspiel'? 'swa-test' : '', appointment.category === 'Pflichtspiel'? 'swa-pflicht' : '']">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ appointment.title }}</div>
                <div class="text-h6">{{ appointment.date }}</div>
                <div class="text-h6">{{ appointment.dateTime }} Uhr</div>
                <div class="text-subtitle2">für {{ appointment.team }}</div>
                <div class="text-subtitle2">auf dem {{ appointment.field }}</div>
              </div>
              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable :to="{name: 'edit-appointment'}">
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

          <q-separator/>

          <q-card-section>
            {{ appointment.content }}
          </q-card-section>
        </q-card>
      </div>
      <div v-show="appointments.length >= 4" class="swa-load-older-news">
        <q-btn color="primary" flat icon-right="autorenew" label="Lade ältere Nachrichten" @click="loadOlderNews"/>
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "appointment-overview",
  components: {
    MainApp
  },
  data () {
    return {
      showBackButton: true,
      prevStep: "PageIndex",
      pageName: "Kalender",
      addSomething: "add-appointment",
      tab: "detail",
      appointments: [
        {
          title: "Testspiel gegen Buseck",
          content: "Treffen eine Stunde früher.",
          category: "Testspiel",
          date: "2022-04-02",
          dateTime: "12:30",
          team: "1. Herren",
          field: "A-Platz",
        },
        {
          title: "Pflichtspiel gegen Buseck",
          content: "Treffen eine Stunde früher.",
          category: "Pflichtspiel",
          date: "2022-04-02",
          dateTime: "12:30",
          team: "1. Herren",
          field: "A-Platz",
        },
        {
          title: "Training",
          content: "Pünkltich sein!!",
          category: "Training",
          date: "2022-04-02",
          dateTime: "12:30",
          team: "1. Herren",
          field: "A-Platz",
        }
      ],
      events: this.appointments
    }
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        console.log("refresh")
        done()
      }, 1000)
    },
    confirmDelete () {
      this.$q.dialog({
        title: 'Löschen',
        message: `Soll die Notiz wirklich gelöscht werden?`,
        cancel: {
          label: 'Abbruch'
        },
        ok: {
          color: 'negative',
          label: 'OK'
        },
        persistent: true
      }).onOk(() => {
        console.log("Gelöscht")
      })
    }
  }
}
</script>

<style lang="scss">
.q-tab-panel{
  padding: 0;
}
.swa-test{
  background-color: $primary;
  color: $white;
  .q-btn__content {
    color: $white;
  }
}

.swa-pflicht {
  background-color: $white;
  color: $primary;
  .q-btn__content{
    color: $primary;
  }
}
</style>
