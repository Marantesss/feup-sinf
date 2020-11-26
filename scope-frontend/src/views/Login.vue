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
              :error-messages="emailErrors"
              label="Password"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-btn color="primary" rounded block class="my-4" @click="submit">
              Login
            </v-btn>

            <v-btn color="primary" rounded outlined block>
              Register
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

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
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.email = "";
    },
  },

  data: () => ({
    email: "",
    password: "",
  }),
};
</script>

<style>
</style>