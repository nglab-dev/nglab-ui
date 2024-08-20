import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import store, { useAppStore, useUserStore } from '@/store'
import { staticRoutes } from '@/router'
import { getUserMenu } from '@/api/auth'

export interface PermissionState {
  routes: RouteRecordRaw[]
  // menus:
}

export const usePermissionStore = defineStore('store-permission', {
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    async generateRoutes() {
      const appStore = useAppStore()
      const userStore = useUserStore()
      if (appStore.menuLoadType === 'static') {
        this.routes = staticRoutes
      }
      else {
        if (!userStore.token) {
          userStore.logout()
          return
        }
        try {
          this.routes = await getUserMenu()
        }
        catch (error) {
          console.error('Failed to get user menu')
        }
      }
      if (this.routes.length === 0) {
        throw new Error('Failed to get routes')
      }
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
