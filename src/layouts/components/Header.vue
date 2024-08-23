<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Breadcrumb from './Breadcrumb.vue'
import UserDropdown from './UserDropdown.vue'
import { useAppStore } from '@/store/modules/app'
import FullScreenSwitcher from '@/components/FullScreenSwitcher.vue'
import LocalePicker from '@/components/LocalePicker.vue'
import DarkSwitcher from '@/components/DarkSwitcher.vue'

const appStore = useAppStore()

const { collapsed } = storeToRefs(appStore)
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
    <!-- preference btn -->
    <PreferenceBtn />
    <!-- user dropdown -->
    <UserDropdown />
  </div>
</template>
