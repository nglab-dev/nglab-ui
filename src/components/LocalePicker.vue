<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/modules/app'
import { availableLocales, loadLanguageAsync } from '@/plugins/i18n'

const appStore = useAppStore()
const { locale } = useI18n()
const { language } = storeToRefs(appStore)

async function changeLanguage(value: string) {
  await loadLanguageAsync(value)
  locale.value = value
  language.value = value
}
</script>

<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <a class="icon-btn">
      <div class="i-lucide-languages" />
    </a>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in availableLocales"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
