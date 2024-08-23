<script setup lang="ts" name="AppMain">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import Tabs from './Tabs.vue'
import { useTabsStore } from '@/store'

const tabsStore = useTabsStore()

const cacheList = computed(() => tabsStore.getCacheList)

// 注入刷新页面方法
const isRouterShow = ref(true)
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)
provide('refresh', refreshCurrentPage)

// 解决详情页 keep-alive 问题
const wrapperMap = new Map()
function createComponentWrapper(component: Component, route: RouteLocationNormalizedLoaded) {
  if (!component)
    return
  const wrapperName = route.fullPath
  let wrapper = wrapperMap.get(wrapperName)
  if (!wrapper) {
    wrapper = { name: wrapperName, render: () => h(component) }
    wrapperMap.set(wrapperName, wrapper)
  }
  return h(wrapper)
}
</script>

<template>
  <Tabs />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheList">
          <component :is="createComponentWrapper(Component, route)" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);
}
</style>
