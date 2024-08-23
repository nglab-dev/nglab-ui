<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import Breadcrumb from './Breadcrumb.vue'
import { useAppStore } from '@/store/modules/app'
import FullScreenSwitcher from '@/components/FullScreenSwitcher.vue'
import LocalePicker from '@/components/LocalePicker.vue'
import DarkSwitcher from '@/components/DarkSwitcher.vue'
import { useUserStore } from '@/store'

const appStore = useAppStore()
const userStore = useUserStore()

const { collapsed } = storeToRefs(appStore)

const { t } = useI18n()

// 退出登录
function logout() {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    userStore.logout()
  })
}
</script>

<template>
  <div class="row items-center gap-2">
    <a class="icon-btn" @click="collapsed = !collapsed">
      <div class="i-lucide-list-collapse" :class="`${collapsed ? '' : 'rotate-180'}`" />
    </a>
    <Breadcrumb />
  </div>
  <div class="flex-auto" />
  <div class="row items-center gap-4">
    <!-- full screen switcher -->
    <FullScreenSwitcher />
    <!-- language picker -->
    <LocalePicker />
    <!-- dark mode switcher -->
    <DarkSwitcher />
    <!-- user dropdown -->
    <el-dropdown trigger="click">
      <el-avatar
        cursor-pointer
        src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">
            <el-icon><SwitchButton /></el-icon>
            {{ t('common.logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
