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
                <q-item clickable @click="getAppointment">
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
    <!-- <div class="row swa-vote">
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
    </div> -->
  </q-card>

  <q-dialog v-model="editAppointment" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="swa-edit-section">
          <q-input outlined v-model="titleValue" label="Titel *" />

          <q-input
            v-model="contentValue"
            outlined
            autogrow
            label="Beschreibung"
          />

          <q-select
            outlined
            v-model="teamValue"
            :options="teams"
            label="Mannschaft"
          />

          <q-select
            outlined
            v-model="categoryValue"
            :options="categories"
            label="Kategorie"
          />

          <q-select
            outlined
            v-model="fieldValue"
            :options="fields"
            label="Platz"
          />

          <div>
            <div class="swa-new-appointment-date">
              <q-date
                v-model="dateValue"
                mask="YYYY-MM-DD"
                color="primary"
                today-btn
              />
            </div>
            <div class="swa-new-appointment-time">
              <q-time
                v-model="dateTimeValue"
                mask="HH:mm"
                color="primary"
                now-btn
                format24h
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Abbrechen" color="primary" v-close-popup />
        <q-btn
          flat
          label="Speichern"
          color="primary"
          @click="editAppointmentFunction"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
    "teams",
    "categorys",
    "fields",
  ],
  setup(props, context) {
    const editAppointment = ref(false);

    const titleValue = ref(props.title);
    const contentValue = ref(props.content);
    const categoryValue = ref(props.category);
    const fieldValue = ref(props.field);
    const teamValue = ref(props.team);
    const timestampValue = ref(new Date(props.timestamp.seconds * 1000));

    const year = ref(timestampValue.value.getFullYear().toString());
    const month = ref(timestampValue.value.getMonth() + 1);
    const day = ref(timestampValue.value.getDate());

    const newMonth = ref("00");
    const newDay = ref("00");

    if (month.value < 10) {
      newMonth.value = "0" + month.value.toString();
    } else {
      newMonth.value = month.value.toString();
    }

    if (day.value < 10) {
      newDay.value = "0" + day.value.toString();
    } else {
      newDay.value = day.value.toString();
    }

    const dateValue = ref(
      year.value + "-" + newMonth.value + "-" + newDay.value
    );

    const dateTimeValue = ref(timestampValue.value.toString().slice(16));

    const getAppointment = () => {
      editAppointment.value = true;
    };

    const confirmDelete = () => {
      context.emit("confirmDelete", props.id);
    };

    const editAppointmentFunction = () => {
      context.emit("edit-appointment", {
        id: props.id,
        title: titleValue.value,
        content: contentValue.value,
        author: props.author,
        category: categoryValue.value,
        field: fieldValue.value,
        team: teamValue.value,
        date: dateValue.value,
        dateTime: dateTimeValue.value,
      });
      editAppointment.value = false;
    };

    return {
      editAppointment,
      titleValue,
      contentValue,
      categoryValue,
      fieldValue,
      teamValue,
      dateValue,
      dateTimeValue,
      getAppointment,
      confirmDelete,
      editAppointmentFunction,
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
