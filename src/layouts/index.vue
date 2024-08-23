<script setup lang="ts" name="LayoutIndex">
import { storeToRefs } from 'pinia'
import LayoutVertical from './vertical.vue'
import type { LayoutMode } from '@/store'
import { useAppStore } from '@/store'

const appName = import.meta.env.VITE_APP_TITLE

const appStore = useAppStore()
const { watermark, layoutMode } = storeToRefs(appStore)

const LayoutComponents: Record<LayoutMode, Component> = {
  vertical: LayoutVertical,
}

const font = reactive({ color: 'rgba(0, 0, 0, .15)' })
watch(isDark, () => (font.color = isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)'), {
  immediate: true,
})
</script>

<template>
  <el-watermark id="watermark" :font="font" :content="watermark ? [appName] : ''">
    <component :is="LayoutComponents[layoutMode]" />
    <!-- <preference-drawer /> -->
  </el-watermark>
</template>

<style scoped>

</style>
