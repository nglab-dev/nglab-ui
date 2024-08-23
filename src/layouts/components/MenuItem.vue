<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

defineProps<{ items: RouteRecordRaw[] }>()

const router = useRouter()
const { t } = useI18n()

function handleClickMenu(menu: RouteRecordRaw) {
  if (menu.meta?.isExternal) {
    window.open(menu.path)
    return
  }
  router.push(menu.path)
}
</script>

<template>
  <template v-for="item in items" :key="item.path">
    <el-sub-menu v-if="item.children?.length" :key="item.path" :index="item.path">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ t(item.meta?.title || '') }}</span>
      </template>
      <menu-item :items="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :key="item?.path" :index="item.path" @click="handleClickMenu(item)">
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ t(item.meta?.title || '') }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
