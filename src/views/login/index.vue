<script setup>
const email = ref('')
const password = ref('')
const checked = ref(false)
</script>

<template>
  <div class="surface-ground min-h-screen min-w-screen flex items-center justify-center overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <!-- <img src="../../assets/images/logo.svg" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0"> -->
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="surface-card w-full px-5 py-8 sm:px-8" style="border-radius: 53px">
          <div class="mb-5 text-center">
            <div class="mb-3 text-2xl font-medium">
              Welcome, Nglab!
            </div>
            <span class="font-medium">Sign in to continue</span>
          </div>

          <div>
            <label for="email1" class="mb-2 block text-900 text-xl font-medium">Email</label>
            <InputText id="email1" v-model="email" type="text" placeholder="Email address" class="mb-5 w-full md:w-30rem" style="padding: 1rem" />

            <label for="password1" class="mb-2 block text-900 text-xl font-medium">Password</label>
            <Password id="password1" v-model="password" placeholder="Password" :toggle-mask="true" class="mb-3 w-full" input-class="w-full" :input-style="{ padding: '1rem' }" />

            <div class="mb-5 flex items-center justify-between gap-5">
              <div class="flex items-center">
                <Checkbox id="rememberme1" v-model="checked" binary class="mr-2" />
                <label for="rememberme1">Remember me</label>
              </div>
              <a class="ml-2 cursor-pointer text-right font-medium no-underline" style="color: var(--primary-color)">Forgot password?</a>
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
