<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const { isCollapsed } = storeToRefs(appStore)

const { t } = useI18n()
</script>

<template>
  <div class="row items-center gap-4">
    <el-button text @click="isCollapsed = !isCollapsed">
      <div :class="`${isCollapsed ? 'i-mdi-menu-close' : 'i-mdi-menu-open'}`" />
    </el-button>
  </div>
  <div class="flex-auto">
    TODO: top menu
  </div>
  <div class="row items-center gap-4">
    <!-- full screen switcher -->
    <full-screen-swicther />
    <!-- language picker -->
    <locale-picker />
    <!-- dark mode switcher -->
    <dark-switcher />
    <!-- preference drawer -->
    <preference-drawer />
    <!-- user avatar -->
    <el-dropdown trigger="click">
      <el-avatar
        cursor-pointer
        src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            {{ t('common.logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
