<template>
  <q-card bordered class="swa-card">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ title }}</div>
          <div class="text-subtitle2">von {{ creatorId }}</div>
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable @click="getNote">
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
      {{ content }}
    </q-card-section>

    <q-separator v-show="comments.length !== 0" />
    <q-card-section v-show="comments.length !== 0">
      <div v-for="(comment, i) in comments" :key="`commentNumber_${i}`">
        <q-chat-message
          :name="comment.author"
          :text="[comment.text]"
          :sent="comment.author === user ? true : false"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="commentMode">
      <q-input
        borderless
        dense
        placeholder="Schreibe einen Kommentar."
        v-model="newComment"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="addNewComment" />
        </template>
      </q-input>
    </q-card-section>
  </q-card>

  <q-dialog v-model="editNote" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="swa-edit-section">
          <div class="swa-edit-section">
            <q-input outlined v-model="titleValue" label="Titel *" />

            <q-input v-model="contentValue" outlined autogrow />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Abbrechen" color="primary" v-close-popup />
        <q-btn
          flat
          label="Speichern"
          color="primary"
          @click="editNoteFunction(id)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { auth } from "src/boot/firebase";

export default defineComponent({
  name: "Note",
  props: ["id", "creatorId", "title", "content", "comments", "commentMode"],
  setup(props, context) {
    const newComment = ref("");

    const editNote = ref(false);

    const titleValue = ref(props.title);
    const contentValue = ref(props.content);

    const user = ref(auth.currentUser.uid);

    const getNote = () => {
      editNote.value = true;
    };

    const confirmDelete = () => {
      context.emit("confirmDelete", props.id);
    };

    const addNewComment = () => {
      context.emit("addNewComment", {
        id: props.id,
        comment: newComment.value,
      });
    };

    const editNoteFunction = (id) => {
      context.emit("edit-note", {
        id: id,
        title: titleValue.value,
        content: contentValue.value,
        creatorId: props.creatorId,
      });
      editNote.value = false;
    };

    return {
      newComment,
      editNote,
      titleValue,
      contentValue,
      user,
      getNote,
      confirmDelete,
      addNewComment,
      editNoteFunction,
    };
  },
});
</script>

<style lang="scss" scoped>
.swa-edit-section {
  min-width: 75vw;
}
</style>
