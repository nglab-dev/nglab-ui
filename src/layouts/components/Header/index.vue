<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const { collapsed } = storeToRefs(appStore)
</script>

<template>
  <div>
    <el-icon class="mr-20px cursor-pointer text-2xl" @click="collapsed = !collapsed">
      <component :is="collapsed ? 'expand' : 'fold'" />
    </el-icon>
  </div>
</template>
