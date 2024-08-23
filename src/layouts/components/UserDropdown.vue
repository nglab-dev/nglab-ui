<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()
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
</template>
