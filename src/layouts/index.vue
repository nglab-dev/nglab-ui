<script setup lang="ts">
import AppHeader from './components/Header/index.vue'
import AppMenu from './components/Menu/index.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const title = import.meta.env.VITE_APP_NAME
const isCollapse = computed(() => appStore.collapsed)
</script>

<template>
  <el-container class="app-container">
    <el-aside class="app-aside">
      <div class="app-aside-wrapper" :style="{ width: isCollapse ? '65px' : '240px' }">
        <!-- logo -->
        <div class="app-logo">
          <img class="w-28px object-contain" src="@/assets/images/logo.svg" alt="logo">
          <span v-show="!isCollapse" class="ml-2 ws-nowrap text-2xl font-bold">{{ title }}</span>
        </div>
        <el-scrollbar class="app-aside-scrollbar">
          <AppMenu />
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container>
      <el-header class="app-header">
        <AppHeader />
      </el-header>
      <!-- <Main /> -->
    </el-container>
  </el-container>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
}

.app-aside {
  width: auto;
  border-right: 1px solid var(--el-border-color);
}

.app-aside-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: width 0.3s ease;
}

.app-logo {
  box-sizing: border-box;
  height: var(--header-height);
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-aside-scrollbar {
  height: calc(100% - var(--header-height));
}

.app-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 15px;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
}
</style>
