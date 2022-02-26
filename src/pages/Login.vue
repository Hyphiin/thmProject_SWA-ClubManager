<template>
<div class="swa-login">
  <h1>Willkommen im Club Manager</h1>

  <q-input
    outlined
    v-model="appUsername"
    label="Benutzername oder E-Mail-Adresse"
  />

  <q-input
    outlined
    type="password"
    v-model="appPassword"
    label="Passwort"/>

  <q-btn
    flat
    label="Passwort vergessen"
    text-color="blue"
  />
  <br>

  <q-btn
    :to="{name: 'PageIndex'}"
    color="primary"
    text-color="white"
    label="Login"
  />
</div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style lang="scss">
.swa-login{
  margin: 0.75rem;
  text-align: center;
  justify-content: center;

  h1 {
    font-size: 2rem;
    line-height: 2.1rem;
    font-weight: bold;
  }

  .q-field {
    margin-bottom: .5rem
  }
}

</style>
