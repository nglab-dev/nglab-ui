<script setup lang="ts" name="LocalePicker">
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
    <el-button circle text>
      <div class="i-lucide-languages" />
    </el-button>
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
