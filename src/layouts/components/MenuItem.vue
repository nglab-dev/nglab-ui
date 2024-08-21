<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

defineProps<{ items: RouteRecordRaw[] }>()

const router = useRouter()
function handleClickMenu(menuItem: RouteRecordRaw) {
  // if (menuItem.meta.isLink)
  //   return window.open(menuItem.meta.isLink, '_blank')
  router.push(menuItem.path)
}
</script>

<template>
  <template v-for="item in items" :key="item.path">
    <el-sub-menu v-if="item.children?.length" :key="item.name" :index="item.path">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span class="sle">{{ item.meta?.title }}</span>
      </template>
      <menu-item :items="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :key="item?.name" :index="item.path" @click="handleClickMenu(item)">
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        <span class="sle">{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
