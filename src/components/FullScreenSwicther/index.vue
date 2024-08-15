<script setup lang="ts" name="FullScreenSwitcher">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <button type="button" aria-label="dark" class="icon-btn" @click="toggle()">
    <div :class="`${isFullscreen ? 'i-mdi-fullscreen-exit' : 'i-mdi-fullscreen'}`" class="text-2xl" />
  </button>
</template>
