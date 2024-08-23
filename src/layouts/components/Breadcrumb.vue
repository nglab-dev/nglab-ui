<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { HOME_PATH } from '@/router'
import { usePermissionStore } from '@/store'

const permissionStore = usePermissionStore()
const route = useRoute()
const router = useRouter()

const { t } = useI18n()
const breadcrumbList = computed(() => {
  let breadcrumbData = permissionStore.getBreadcrumbs[route.matched[route.matched.length - 1].path] ?? []

  // 🙅‍♀️不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].path !== HOME_PATH) {
    breadcrumbData = [{ path: HOME_PATH, meta: { icon: 'House', title: 'menu.home' } }, ...breadcrumbData]
  }
  return breadcrumbData
})

function onBreadcrumbClick(item: RouteRecordRaw, index: number) {
  if (index !== breadcrumbList.value.length - 1)
    router.push(item.path)
}
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <div
          class="el-breadcrumb__inner is-link"
          @click="onBreadcrumbClick(item, index)"
        >
          <span class="breadcrumb-title">{{ t(item.meta.title) }}</span>
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
