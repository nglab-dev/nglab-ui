<script setup lang="ts">
function toggleDarkMode() {
  alert('TODO toggle dark mode')
}
</script>

<template>
  <header class="border-b top-0 left-0 right-0 fixed z-50">
    <Toolbar style="border-radius: 0;">
      <template #start>
        <div class="flex items-center gap-2">
          <AppLogo />
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-4">
          <button type="button" class="navbar-item" @click="toggleDarkMode">
            <i class="pi pi-moon" />
          </button>
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
        </div>
      </template>
    </Toolbar>
  </header>
</template>

<style scoped lang="scss">
.navbar-item {
  @apply inline-flex border-none bg-white cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-9 py-2 w-9 px-0;
}
</style>
