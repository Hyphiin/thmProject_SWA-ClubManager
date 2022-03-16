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
      <q-card class="swa-card">
        <q-img :ratio="16/9" src="https://img.archiexpo.de/images_ae/photo-mg/89030-11620362.webp">
          <div class="absolute-bottom text-h6">
            A-Platz
          </div>
        </q-img>

        <q-list>
          <q-item clickable to="/fields/edit-field">
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
              <q-item-label>Platzbelegung</q-item-label>
              <q-item-label caption>Weise den Teams Trainigszeiten auf den Plätzen zu</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="confirmDelete">
            <q-item-section avatar>
              <q-icon color="negative" name="delete" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Platz löschen</q-item-label>
              <q-item-label caption>Lösche diesen Platz</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <q-card class="swa-card">
        <q-img :ratio="16/9" src="https://sportflaechen.de/wp-content/uploads/2018/01/unsleben-%C2%A9-Rudolf-S%C3%B6der-1280x640.jpg">
          <div class="absolute-bottom text-h6">
            B-Platz
          </div>
        </q-img>

        <q-list>
          <q-item clickable :to="{name: 'edit-field'}">
            <q-item-section avatar>
              <q-icon color="primary" name="edit" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Platz bearbeiten</q-item-label>
              <q-item-label caption>Ändere die Angaben zum Platz.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable :to="{ name: 'field-assignment' }">
            <q-item-section avatar>
              <q-icon color="red" name="schedule" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Platzbelegung</q-item-label>
              <q-item-label caption>Weise den Teams Trainigszeiten auf den Plätzen zu</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="confirmDelete">
            <q-item-section avatar>
              <q-icon color="negative" name="delete" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Platz löschen</q-item-label>
              <q-item-label caption>Lösche diesen Platz</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>


    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "fields-overview",
  components: {
    MainApp
  },
  data () {
    return {
      showBackButton: true,
      prevStep: "PageIndex",
      pageName: "Platzverwaltung",
      addSomething: "add-field",
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
        message: `Soll der Platz wirklich gelöscht werden?`,
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

<style scoped>

</style>
