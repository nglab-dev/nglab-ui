<script setup>
const username = ref('')
const password = ref('')
const router = useRouter()

function handleLogin() {
  router.replace('/')
}
</script>

<template>
  <div class="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-6 w-6">
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Nglab
      </div>

      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            “Nglab is the next generation laboratory information system.”
          </p>
          <footer class="text-sm">
            xc.chen
          </footer>
        </blockquote>
      </div>
    </div>

    <div class="lg:p-8">
      <div class="mx-auto w-full flex flex-col justify-center sm:w-[420px] space-y-6">
        <div class="flex flex-col text-center space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">
            Login an account
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below to login your account
          </p>
        </div>

        <div class="grid gap-6">
          <form>
            <div class="grid gap-2">
              <div class="grid gap-1">
                <label for="username" class="mb-2 block font-medium">Username</label>
                <InputText id="username" v-model="username" type="text" placeholder="Username" class="mb-5 w-full" style="padding: 1rem" />
              </div>
              <div class="grid gap-1">
                <label for="password" class="mb-2 block font-medium">Password</label>
                <Password id="password" v-model="password" placeholder="Password" :feedback="false" :toggle-mask="true" class="mb-3 w-full" input-class="w-full" :input-style="{ padding: '1rem' }" />
              </div>
              <Button label="Sign In" class="w-full p-3 text-xl" @click="handleLogin" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
