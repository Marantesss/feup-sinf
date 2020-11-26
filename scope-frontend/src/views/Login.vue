<template>
  <v-container fill-height>
    <v-row>
      <v-card width="400">
        <v-card-title>LOGIN</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              label="Password"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-btn
              color="primary"
              :loading="this.loading"
              rounded
              block
              class="my-4"
              @click="submit"
            >
              Login
            </v-btn>

            <v-btn color="primary" rounded outlined block> Register </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import api from "@/services/api";

export default {
  name: "Login",

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    submit() {
      // validate with Vuelidator
      this.$v.$touch();
      // if form is invalid dont do anything
      if (this.$v.$invalid) {
        return;
      }
      // send request to api
      const body = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      this.error = false;
      api.login(
        body,
        (res) => {
          this.loading = false;
          if (res.data.status == 200) {
            // send login action to user module
            this.$store.dispatch({
              type: "user/logIn",
              jwtToken: res.data.token,
            });
            // redirect to dashboard
            this.$router.replace('/');
          } else {
            this.error = true;
          }
        },
        (err) => {
          console.log(`login error: ${err}`);
        }
      );
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    },
  },

  data: () => ({
    email: "",
    password: "",
    error: false,
    loading: false,
  }),
};
</script>

<style>
</style>