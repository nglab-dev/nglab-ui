<script setup>
import { useForm } from 'vee-validate'
import { setLocale } from '@vee-validate/i18n'
import * as yup from 'yup'

const router = useRouter()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
})

setLocale('zh_CN')

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

const handleLogin = handleSubmit((_values) => {
  // TODO
  router.replace('/')
})
</script>

<template>
  <div class="relative hidden h-full flex-col items-center justify-center container md:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
    <div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:(border-r border-[#27272a])">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <AppLogo />
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
          <h1 class="text-3xl font-semibold tracking-tight">
            Login an account
          </h1>
          <p class="text-muted-foreground text-sm">
            Enter your email below to login your account
          </p>
        </div>

        <div class="grid gap-6">
          <form>
            <div class="grid gap-2">
              <div class="grid gap-1">
                <label for="username" class="mb-2 block font-medium">Username</label>
                <InputText id="username" v-model="username" type="text" placeholder="Username" class="w-full" v-bind="usernameAttrs" style="padding: 1rem" />
                <small id="username-help" class="mb-3 c-red-6">{{ errors.username }}</small>
              </div>
              <div class="grid gap-1">
                <label for="password" class="mb-2 block font-medium">Password</label>
                <Password id="password" v-model="password" placeholder="Password" :feedback="false" :toggle-mask="true" v-bind="passwordAttrs" class="w-full" input-class="w-full" :input-style="{ padding: '1rem' }" />
                <small id="username-help" class="mb-3 c-red-6">{{ errors.password }}</small>
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
