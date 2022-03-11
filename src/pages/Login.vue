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
import { useRouter } from "vue-router";
import { Notify } from "quasar";
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

    const router = useRouter();

    const createUser = (email, password) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          Notify.create({
            message: `Willkommen ${user.email}!`,
            color: "positive",
            position: "top",
          });
          router.replace({ name: "PageIndex" });
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          Notify.create({
            message: `${errorMessage}`,
            color: "negative",
            position: "top",
          });
          // ..
        });
    };

    const loginUser = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          Notify.create({
            message: `Willkommen ${user.displayName}!`,
            color: "positive",
            position: "top",
          });
          router.replace({ name: "PageIndex" });
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          Notify.create({
            message: `${errorMessage}`,
            color: "negative",
            position: "top",
          });
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
