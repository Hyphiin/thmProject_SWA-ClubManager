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
      <div v-for="(note, i) in this.notes" :key="`noteNumber_${i}`">
        <q-card bordered class="swa-card">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ note.title }}</div>
                <div class="text-subtitle2">von {{ note.author }}</div>
              </div>
              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable :to="{name: 'edit-note'}">
                        <q-item-section>Bearbeiten</q-item-section>
                      </q-item>
                      <q-item clickable>
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
            {{ note.content }}
          </q-card-section>

          <q-separator v-show="note.comments.length !== 0" />
          <q-card-section v-show="note.comments.length !== 0">
            <div v-for="(comment, i) in note.comments" :key="`commentNumber_${i}`">
              <q-chat-message
                :name="comment.author"
                :text="[comment.text]"
                :sent="comment.sent"
              />
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-input
              borderless
              placeholder="Schreibe einen Kommentar."
              v-model="newComment"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="addNewComment()" />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </div>
    </q-pull-to-refresh>
  </main-app>
</template>

<script>
import MainApp from "pages/MainApp";

export default {
  name: "notes-overview",
  components: {
    MainApp
  },
  data () {
    return {
      showBackButton: true,
      prevStep: "PageIndex",
      pageName: "Schwarzes Brett",
      addSomething: "add-note",
      newComment: "",
      notes: [
        {
          title: "Bierverkostung März 2022",
          author: "John Doe",
          content: " Lorem ipsum dolor sit amet",
          comments: [
            {
              text: "Moin, wann treffen wir uns?",
              author: "me",
              sent: true
            },
            {
              text: "Moin, ich glaube um 11 Uhr",
              author: "Pascal",
              sent: false
            }
          ]
        },
        {
          title: "Tag der offenen Tür April 2022",
          author: "Karl",
          content: " Lorem ipsum dolor sit amet",
          comments: [
            {
              text: "Wurden die Einladungen schon verschickt?",
              author: "Pascal",
              sent: false
            }
          ]
        },
        {
          title: "Pokalfinale April 2022",
          author: "Karl",
          content: " Lorem ipsum dolor sit amet",
          comments: [
          ]
        }
      ]
    }
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        console.log("refresh")
        done()
      }, 1000)
    },

    addNewComment() {
      console.log(this.notes)
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
