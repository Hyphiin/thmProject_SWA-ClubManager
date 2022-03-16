<template>
  <q-card
    bordered
    class="swa-card"
    :class="[
      categoryValue === 'Testspiel' ? 'swa-test' : '',
      categoryValue === 'Pflichtspiel' ? 'swa-pflicht' : '',
    ]"
  >
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ titleValue }}</div>
          <div class="text-h6">{{ dateValue }}</div>
          <div class="text-h6">{{ dateTimeValue }} Uhr</div>
          <div class="text-subtitle2">für {{ teamValue }}</div>
          <div class="text-subtitle2">auf dem {{ fieldValue }}</div>
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
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
      {{ contentValue }}
    </q-card-section>

    <q-separator />
    <div class="row swa-vote">
      <div class="col-6">
        <q-btn class="swa-cancel full-width" icon="thumb_down">{{
          appointment.cancellation
        }}</q-btn>
      </div>
      <div class="col-6">
        <q-btn class="swa-commitment full-width" icon="thumb_up">{{
          appointment.commitments
        }}</q-btn>
      </div>
    </div>
  </q-card>

  <!-- <q-dialog v-model="editNote" persistent>
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
          @click="editNoteFunction(id, title, content)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "Appointment",
  props: [
    "id",
    "author",
    "title",
    "content",
    "category",
    "field",
    "team",
    "timestamp",
  ],
  setup(props, context) {
    const editNote = ref(false);

    const titleValue = ref(props.title);
    const contentValue = ref(props.content);
    const categoryValue = ref(props.category);
    const fieldValue = ref(props.field);
    const teamValue = ref(props.team);
    const timestampValue = ref(props.timestamp);

    const splitDate = timestampValue.split(" ");
    const dateValue = ref(splitDate[0]);
    const dateTimeValue = ref(splitDate[1]);

    const getNote = () => {
      context.emit("getNote", props.id);
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

    const editNoteFunction = (id, title, content) => {
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
      categoryValue,
      fieldValue,
      teamValue,
      dateValue,
      dateTimeValue,
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

.swa-test {
  background-color: $primary;
  color: $white;
  .q-btn__content {
    color: $white;
  }
}

.swa-pflicht {
  background-color: $white;
  color: $primary;
  .q-btn__content {
    color: $primary;
  }
}
</style>
