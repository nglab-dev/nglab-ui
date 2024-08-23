<script setup lang="ts">
const { toggleDark } = useTheme()
</script>

<template>
  <a class="icon-btn" @click="toggleDark">
    <div class="i-lucide-moon dark:i-lucide-sun" />
  </a>
</template>
