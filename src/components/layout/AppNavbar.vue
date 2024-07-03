<script setup lang="ts">
const userMenuRef = ref()

const userActions = ref([
  {
    label: 'UserInfo',
    icon: 'pi pi-share-alt',
  },
  {
    separator: true,
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => {
      console.error('Profile')
    },
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    command: () => {
      console.error('Profile')
    },
  },
  {
    separator: true,
  },
  {
    label: 'Log out',
    icon: 'pi pi-sign-out',
    command: () => {
      console.error('logout')
    },
  },
])

const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
  },
])

function toggle(event: Event) {
  userMenuRef.value.toggle(event)
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full">
    <Menubar :model="items" style="border-radius: 0;">
      <template #start>
        <AppLogo />
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border rounded p-1 text-xs">{{ item.shortcut }}</span>
          <i v-if="hasSubmenu" class="pi pi-angle-down" :class="[{ 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]" />
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-4">
          <button type="button" class="navbar-item" @click="toggleDark()">
            <i class="pi" :class="[{ 'pi-moon': isDark, 'pi-sun': !isDark }]" />
          </button>
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="h-8 w-8 cursor-pointer" @click="toggle " />
          <TieredMenu id="overlay_tmenu" ref="userMenuRef" :model="userActions" popup>
            <template #item="{ item, props, hasSubmenu }">
              <div v-if="item.label === 'UserInfo'" class="cursor-pointer px-2 py-1.5 text-sm font-normal">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">
                    shadcn
                  </p>
                  <p class="text-xs leading-none">
                    m@example.com
                  </p>
                </div>
              </div>
              <a v-else class="flex items-center" v-bind="props.action">
                <span :class="item.icon" />
                <span class="">{{ item.label }}</span>
                <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                <span v-if="item.shortcut" class="ml-auto border rounded p-1 text-xs">{{ item.shortcut }}</span>
                <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto" />
              </a>
            </template>
          </TieredMenu>
        </div>
      </template>
    </Menubar>
  </header>
</template>

<style scoped>
.navbar-item {
  --at-apply: 'inline-flex border-none cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:dark:bg-gray-700  h-9 py-2 w-9 px-0';
}
</style>
