<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { loadLanguageAsync } from '@/locales'

const languageMenuRef = ref()

const { locale } = useI18n()

const languages = ref<MenuItem[]>([
  {
    label: 'cn 简体中文',
    command: async () => {
      await loadLanguageAsync('zh-CN')
      locale.value = 'zh-CN'
    },
  },
  {
    label: 'us English',
    command: async () => {
      await loadLanguageAsync('en')
      locale.value = 'en'
    },
  },
])

function toggleLanguage(event: Event) {
  languageMenuRef.value.toggle(event)
}
</script>

<template>
  <Button severity="secondary" size="large" icon="pi pi-language" text rounded @click="toggleLanguage" />
  <TieredMenu id="language_tmenu" ref="languageMenuRef" :model="languages" popup />
</template>
