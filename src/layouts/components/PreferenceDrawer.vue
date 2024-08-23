<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'
import emitter from '@/utils/bus'

const drawerVisible = ref(false)

emitter.on('open-preference-drawer', () => {
  drawerVisible.value = true
})

const { t } = useI18n()

const colorModes = [
  {
    label: '浅色',
    value: 'light',
    icon: 'i-lucide-sun',
  },
  {
    label: '跟随系统',
    value: 'auto',
    icon: 'i-lucide-monitor',
  },
  {
    label: '深色',
    value: 'dark',
    icon: 'i-lucide-moon',
  },
] as {
  label: string
  value: 'light' | 'dark' | 'auto'
  icon: string
}[]

const defaultColors = [
  '#009688',
  '#daa96e',
  '#0c819f',
  '#409eff',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6',
]

const mode = useColorMode({
  emitAuto: true,
})

const appStore = useAppStore()
const { primaryColor } = storeToRefs(appStore)

const { changePrimaryColor } = useTheme()

function toggleColorMode(value: 'light' | 'dark' | 'auto') {
  mode.value = value
}
</script>

<template>
  <el-drawer v-model="drawerVisible" :title="t('preferences.title')" size="380px">
    <div class="flex flex-col">
      <el-divider class="divider" content-position="center">
        全局主题
      </el-divider>
      <div class="w-full flex flex-wrap justify-between">
        <div v-for="item in colorModes" :key="item.value" class="flex flex-col cursor-pointer">
          <div class="outline-box fcc py-4" :class="mode === item.value ? 'outline-box-active ' : ''" @click="toggleColorMode(item.value)">
            <i class="mx-9" :class="item.icon" />
          </div>
          <div class="mt-2 text-center">
            {{ item.label }}
          </div>
        </div>
      </div>

      <div class="fcb mt-6">
        <span>主题颜色</span>
        <el-color-picker v-model="primaryColor" :predefine="defaultColors" @change="changePrimaryColor(primaryColor)" />
      </div>
    </div>
  </el-drawer>
</template>
