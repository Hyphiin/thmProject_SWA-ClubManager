<template>
  <div class="swa-login">
    <h1>Willkommen im Club Manager</h1>

    <q-input
      outlined
      v-model="email"
      label="Benutzername oder E-Mail-Adresse"
    />

    <q-input outlined type="password" v-model="pw" label="Passwort" />

    <q-btn flat label="Passwort vergessen" text-color="blue" />
    <br />

    <q-btn
      color="primary"
      text-color="white"
      label="Login"
      @click="loginUser(email, pw)"
    />
    <q-btn
      color="primary"
      text-color="white"
      label="Registrieren"
      @click="createUser(email, pw)"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default defineComponent({
  name: "Login",
  setup() {
    const email = ref("");
    const pw = ref("");

    const createUser = (email, password) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Erfolgreich registriert als: ", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Registrierung fehlgeschlagen!", errorCode, errorMessage);
          // ..
        });
    };

    const loginUser = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Erfolgreich eingeloggt als: ", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Loginproess gescheitert!");
        });
    };

    return {
      email,
      pw,
      createUser,
      loginUser,
    };
  },
});
</script>

<style lang="scss">
.swa-login {
  margin: 0.75rem;
  text-align: center;
  justify-content: center;

  h1 {
    font-size: 2rem;
    line-height: 2.1rem;
    font-weight: bold;
  }

  .q-field {
    margin-bottom: 0.5rem;
  }
}
</style>
