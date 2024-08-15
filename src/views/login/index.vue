<script setup lang="ts" mame="Login">
import LoginForm from './components/LoginForm.vue'
import Footer from '@/layouts/components/Footer/index.vue'

const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div class="h-full flex">
    <div class="fixed left-8 top-8 z-1 inline-flex items-center">
      <img class="w-8" alt="logo" src="../../assets/images/logo.svg">
      <div class="m-2 text-2xl color-white font-500">
        {{ appName }}
      </div>
    </div>
    <div class="w-520px flex flex-col justify-end bg-zinc-900 max-lg:hidden">
      <div relative mb-10 ml-10 w-450px text-left text-xl color-white font-500>
        The Next Generation Lab Information Management System
      </div>
    </div>

    <div relative flex flex-1 items-center justify-center pb-40px>
      <div class="w-320px">
        <LoginForm />
      </div>
      <div w="100%" absolute bottom-0 right-0>
        <Footer />
      </div>
    </div>
  </div>
</template>
