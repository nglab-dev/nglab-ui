<script setup lang="ts">
import emitter from '@/utils/bus'

function openPreferenceDrawer() {
  emitter.emit('open-preference-drawer')
}
</script>

<template>
  <a class="icon-btn" @click="openPreferenceDrawer">
    <div class="i-lucide-settings" />
  </a>
</template>
