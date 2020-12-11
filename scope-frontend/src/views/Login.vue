<template>
  <v-container fill-height fluid class="pa-0">
    <v-row align="center" justify="center" alignContent="center" noGutters>
      <v-col lg="3" md="5" sm="12" class="d-flex justify-center">
        <v-card
          width="400"
          elevation="0"
          class="d-flex flex-column align-center"
        >
          <v-card-title>
            <v-img
              width="150"
              :src="require('@/assets/scope-logo-main-color.svg')"
            ></v-img
          ></v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                outlined
                rounded
                clearable
                dense
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                type="password"
                password
                outlined
                rounded
                clearable
                dense
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
      </v-col>

      <v-col
        lg="9"
        md="7"
        sm="0"
        class="login-image-container d-none d-md-flex"
      >
        <v-img
          class="login-image"
          :src="require('@/assets/img/login.jpg')"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import api from "@/services/api";

export default {
  name: "Login",
  created: (() => { document.title = 'scope - Login' }),
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
            this.$store.dispatch({
              type: "alerts/addSuccessAlert",
              message: "Login Successfull",
            });
            // redirect to dashboard
            this.$router.replace("/");
          } else {
            this.$store.dispatch({
              type: "alerts/addWarningAlert",
              message: "Credentials do not match our logs",
            });
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
    loading: false,
  }),
};
</script>

<style scoped>
.login-image-container {
  background-color: rgb(41, 86, 98);
}

.login-image {
  height: 100vh !important;
  opacity: 0.3;
}
</style>