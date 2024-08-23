<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { loadLanguageAsync } from './plugins/i18n'
import { useAppStore } from './store/modules/app'

const appStore = useAppStore()

const { language } = storeToRefs(appStore)

onMounted(() => {
  loadLanguageAsync(language.value)
})
</script>

<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>
