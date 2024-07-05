<script setup>
import { useForm } from 'vee-validate'
import { setLocale } from '@vee-validate/i18n'
import * as yup from 'yup'
import AppLocalePicker from '@/components/layout/AppLocalePicker.vue'
import { useUserStore } from '@/stores/modules/user'

const { t } = useI18n()

const router = useRouter()

const loading = ref(false)

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
})

setLocale('zh_CN')

const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')

const handleLogin = handleSubmit((values) => {
  loading.value = true
  useUserStore()
    .login({
      username: values.username,
      password: values.password,
    })
    .then(() => {
      userToken.value && router.replace('/')
    })
    .catch((e) => {
      console.error(e)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <div class="relative mx-auto hidden h-full w-full flex-col items-center justify-center container md:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
    <div class="absolute right-4 top-4 md:right-8 md:top-8">
      <AppLocalePicker />
    </div>

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
                <InputText id="username" v-model="username" type="text" placeholder="Username" class="w-full" :invalid="errors.username" v-bind="usernameAttrs" style="padding: 1rem" />
                <small id="username-help" class="mb-3 c-red-6">{{ errors.username }}</small>
              </div>
              <div class="grid gap-1">
                <label for="password" class="mb-2 block font-medium">Password</label>
                <Password id="password" v-model="password" placeholder="Password" :feedback="false" :toggle-mask="true" :invalid="errors.password" v-bind="passwordAttrs" class="w-full" input-class="w-full" :input-style="{ padding: '1rem' }" />
                <small id="username-help" class="mb-3 c-red-6">{{ errors.password }}</small>
              </div>
              <Button :label="t('user.sign_in')" class="text-xl" w-full p-3 :loading="loading" @click="handleLogin" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Toast position="top-center" />
</template>

<style lang="scss">

</style>
