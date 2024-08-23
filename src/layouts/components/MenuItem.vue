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

<style lang="scss" scoped>
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color);
  background-color: transparent;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff;
      background-color: var(--el-color-primary);
    }
  }
}

.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color);
    background-color: var(--el-menu-active-bg-color);
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
</style>
