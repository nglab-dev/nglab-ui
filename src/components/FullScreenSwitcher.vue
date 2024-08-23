<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <a class="icon-btn" @click="toggle()">
    <div :class="`${isFullscreen ? 'i-lucide-minimize' : 'i-lucide-maximize'}`" />
  </a>
</template>
