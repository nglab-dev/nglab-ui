<script setup>
// const logform = ref();
import { Form } from 'vee-validate'

const checkbox = ref(false)
const valid = ref(false)
const show1 = ref(false)
const password = ref('admin123')
const username = ref('info@codedthemes.com')
</script>

<template>
  <v-row class="h-screen" no-gutters>
    <!---Left Part -->
    <v-col cols="12" class="d-flex align-center bg-lightprimary">
      <v-container>
        <div class="pa-sm-12 pa-7">
          <v-row justify="center">
            <v-col cols="12" lg="10" xl="6" md="7">
              <v-card elevation="0" class="loginBox">
                <v-card variant="outlined">
                  <v-card-text class="pa-9">
                    <!---Left Part Logo -->
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <h2 class="text-secondary text-h2 mt-8">
                          Hi, Welcome Back
                        </h2>
                        <h4 class="text-disabled text-h4 mt-3">
                          Enter your credentials to continue
                        </h4>
                      </v-col>
                    </v-row>
                    <!---Left Part Logo -->

                    <!---Left Part Form -->
                    <h5 class="text-h5 my-4 mb-8 text-center">
                      Sign in with Email address
                    </h5>
                    <Form class="loginForm mt-7">
                      <v-text-field
                        v-model="username"
                        label="Email Address / Username"
                        class="mb-8 mt-4"
                        required
                        density="comfortable"
                        hide-details="auto"
                        variant="outlined"
                        color="primary"
                      />
                      <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        density="comfortable"
                        variant="outlined"
                        color="primary"
                        hide-details="auto"
                        :append-icon="show1 ? '$eye' : '$eyeOff'"
                        :type="show1 ? 'text' : 'password'"
                        class="pwdInput"
                        @click:append="show1 = !show1"
                      />
                      <div class="d-sm-flex align-center mb-sm-0 mb-7 mt-2">
                        <v-checkbox
                          v-model="checkbox"
                          label="Remember me?"
                          required
                          color="primary"
                          class="ms-n2"
                          hide-details
                        />
                        <div class="ml-auto">
                          <a href="javascript:void(0)" class="text-primary text-decoration-none">Forgot password?</a>
                        </div>
                      </div>
                      <v-btn color="secondary" block class="mt-2" variant="flat" size="large" :disabled="valid" type="submit">
                        Sign In
                      </v-btn>
                    </Form>
                    <!---Left Part Form -->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Left Part -->
  </v-row>
</template>

<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}

.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}
.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}
.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}
.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}
.pwdInput {
  position: relative;
  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
