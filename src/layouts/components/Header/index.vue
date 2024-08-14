<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const { isCollapsed } = storeToRefs(appStore)
</script>

<template>
  <div class="row">
    <button type="button" class="icon-btn" @click="isCollapsed = !isCollapsed">
      <div :class="`${isCollapsed ? 'i-mdi-menu-close' : 'i-mdi-menu-open'}`" class="text-2xl" />
    </button>
  </div>
  <div class="flex-auto">
    TODO: top menu
  </div>
  <div class="row gap-4">
    <full-screen />

    <locale-picker />

    <dark-switcher />
  </div>
</template>
