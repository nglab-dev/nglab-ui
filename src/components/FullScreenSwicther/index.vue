<script setup lang="ts" name="FullScreenSwitcher">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <el-button circle text @click="toggle()">
    <div :class="`${isFullscreen ? 'i-lucide-minimize' : 'i-lucide-maximize'}`" />
  </el-button>
</template>
