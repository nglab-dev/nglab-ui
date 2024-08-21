<script setup lang="ts" name="AppMain">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

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
  <router-view v-slot="{ Component, route }">
    <transition appear name="fade-transform" mode="out-in">
      <component :is="createComponentWrapper(Component, route)" :key="route.fullPath" />
    </transition>
  </router-view>
</template>
