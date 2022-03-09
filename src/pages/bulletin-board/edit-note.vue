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
        />

        <q-btn color="primary" class="full-width" label="Speichern" icon="done" />
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "edit-note",
  components: {
    MainApp
  },
  data () {
    return {
      showBackButton: true,
      prevStep: "notes-overview",
      pageName: "Notiz bearbeiten",
      showAddButton: false,
      title:"Test",
      content:"Lorem ipsum dolor sit amet"
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

<style scoped>

</style>
