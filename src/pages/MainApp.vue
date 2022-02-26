<template>
  <div>
    <!--Hier werden die Bearbeitungssachen geladen-->
    <slot></slot>

    <q-page-sticky expand position="top">
      <q-toolbar class="swa-toolbar">
        <q-btn
          flat
          round
          dense
          icon="arrow_back_ios"
          class="swa-back-button"
          :to="{name: prevStep}"
          v-show="showBackButton"
        />
        <q-toolbar-title>
          {{ pageName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-page-sticky>

    <q-page-sticky position="bottom-right" v-show="showAddButton" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" :to="{name: addSomething}" />
    </q-page-sticky>
  </div>
</template>

<script>
export default {
  name: "MainApp",
  props: {
    showBackButton: {
      type: Boolean,
      default: true
    },
    prevStep: {
      type: String,
      default: ''
    },
    pageName: {
      type: String,
      default: ''
    },
    addSomething: {
      type: String,
      default: ''
    },
    showAddButton: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.swa-toolbar {
  background-color: $white;
  color: $primary;

  .q-toolbar__title {
    display: flex;
    justify-content: center;
  }
  .swa-back-button{
    position: absolute;
  }
}
</style>
