<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const { isCollapsed } = storeToRefs(appStore)

const { t } = useI18n()
</script>

<template>
  <div class="row">
    <button type="button" class="icon-btn" @click="isCollapsed = !isCollapsed">
      <div :class="`${isCollapsed ? 'i-mdi-menu-close' : 'i-mdi-menu-open'}`" class="text-2xl" />
    </button>
  </div>
  <div class="flex-auto">
    TODO: top menu
  </div>
  <div class="row gap-4">
    <!-- full screen switcher -->
    <full-screen-swicther />
    <!-- language picker -->
    <locale-picker />
    <!-- dark mode switcher -->
    <dark-switcher />
    <!-- user avatar -->
    <el-dropdown trigger="click">
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
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
