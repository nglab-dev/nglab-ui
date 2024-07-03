<script setup lang="ts">
</script>

<template>
  <section class="relative min-h-screen flex flex-col">
    <AppNavbar />
    <section class="flex flex-1 flex-col">
      <main class="flex-1 p-2">
        <router-view />
      </main>
      <AppFooter />
    </section>
  </section>
</template>
