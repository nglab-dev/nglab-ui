<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { FolderDelete, FullScreen, Refresh, Remove } from '@element-plus/icons-vue'
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useAppStore, usePermissionStore, useTabsStore } from '@/store'
import { HOME_PATH } from '@/router'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabsStore = useTabsStore()
const permissionStore = usePermissionStore()

const { t } = useI18n()
const { contentMaxmized } = storeToRefs(appStore)
const currentTab = ref(route.fullPath)
const tabList = computed(() => tabsStore.tabList)

function addTab(item: RouteRecordRaw) {
  tabsStore.addTab({
    icon: item.meta?.icon || '',
    title: item.meta?.title || '',
    path: item.path,
    name: (item.name as string) || '',
    close: !item.meta?.affixTab,
    keepAlive: item.meta?.keepAlive || false,
  })
}

function handleTabClick(tabItem: TabsPaneContext) {
  const fullPath = tabItem.props.name as string
  router.push(fullPath)
}

function handleTabRemove(fullPath: TabPaneName) {
  tabsStore.removeTab(fullPath as string, fullPath === route.fullPath)
}

function initTabs() {
  permissionStore.menus.forEach((item) => {
    if (item.meta?.affixTab && !item.meta.hideInMenu) {
      addTab(item)
    }
  })
}

const refreshCurrentPage: Function = inject('refresh') as Function

function refresh() {
  setTimeout(() => {
    // route.meta.keepAlive && keepAliveStore.removeKeepAliveName(route.fullPath as string)
    refreshCurrentPage(false)
    nextTick(() => {
      // route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath as string)
      refreshCurrentPage(true)
    })
  }, 0)
}

function closeCurrent() {
  if (route.meta.affixTab)
    return
  tabsStore.removeTab(route.fullPath)
}

function closeAll() {
  tabsStore.closeAll()
  router.push(HOME_PATH)
}

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull)
      return
    currentTab.value = route.fullPath
    addTab(route)
  },
  { immediate: true },
)

onMounted(() => {
  initTabs()
})
</script>

<template>
  <div class="relative w-full flex bg-[var(--el-bg-color)]">
    <el-tabs v-model="currentTab" type="card" @tab-click="handleTabClick" @tab-remove="handleTabRemove">
      <template #add-icon />
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
        <template #label>
          {{ t(item.title) }}
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="flex">
      <div class="tab-action-item" @click="refresh">
        <el-icon><Refresh /></el-icon>
      </div>
      <div class="tab-action-item">
        <el-dropdown trigger="click" :teleported="false">
          <i class="i-lucide-chevron-down" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="closeCurrent">
                <el-icon><Remove /></el-icon>
                {{ t("tabs.close_current") }}
              </el-dropdown-item>
              <el-dropdown-item @click="tabsStore.closeByDirection(route.fullPath, 'left')">
                <el-icon><DArrowLeft /></el-icon>
                {{ t("tabs.close_left") }}
              </el-dropdown-item>
              <el-dropdown-item @click="tabsStore.closeByDirection(route.fullPath, 'right')">
                <el-icon><DArrowRight /></el-icon>
                {{ t("tabs.close_right") }}
              </el-dropdown-item>
              <el-dropdown-item divided @click="tabsStore.closeAll(route.fullPath)">
                <el-icon><CircleClose /></el-icon>{{ t("tabs.close_other") }}
              </el-dropdown-item>
              <el-dropdown-item @click="closeAll">
                <el-icon><FolderDelete /></el-icon>
                {{ t("tabs.close_all") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="tab-action-item" @click="contentMaxmized = !contentMaxmized">
        <el-icon><FullScreen /></el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
 :deep(.el-tabs) {
  flex: 1 1 0%;

  .el-tabs__header {
    margin: 0px;
    .el-tabs__nav-wrap {
      .el-tabs__nav {
        border: none;
        .el-tabs__item {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #afafaf;
          border: none;
          .tabs-icon {
            margin: 1.5px 4px 0 0;
            font-size: 15px;
          }
          .is-icon-close {
            margin-top: 1px;
          }
          &.is-active {
            color: var(--el-color-primary);
            &::before {
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 0;
              content: '';
              border-bottom: 2px solid var(--el-color-primary) !important;
            }
          }
        }
      }
    }
  }
}

.tab-action-item {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;

  justify-content: center;
  border-left: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);

  i {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
