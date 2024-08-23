import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useAppStore, useUserStore } from '@/store'
import { buildBreadcrumbs, filterRoutes, flatRoutes } from '@/utils/router'
import router from '@/router'
import { getUserPermissions } from '@/api/auth'
import { staticRoutes } from '@/router/static'

export interface PermissionState {
  menus: RouteRecordRaw[]
  flatMenus: RouteRecordRaw[]
  currentRouteName: string
}

export const usePermissionStore = defineStore('store-permission', {
  state: (): PermissionState => ({
    menus: [],
    flatMenus: [],
    currentRouteName: '',
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return filterRoutes(this.menus)
    },
    getBreadcrumbs(): Recordable {
      return buildBreadcrumbs(this.menus)
    },
  },
  actions: {
    async buildRoutes() {
      const modules = import.meta.glob('@/views/**/*.vue')
      const appStore = useAppStore()
      const userStore = useUserStore()

      if (!userStore.isLogin) {
        ElNotification({
          title: '无权限访问',
          message: '当前账号无任何菜单权限，请联系系统管理员！',
          type: 'warning',
          duration: 3000,
        })
        router.replace('/login')
        return Promise.reject(new Error('无权限访问'))
      }

      try {
        if (appStore.menuMode === 'static') {
          this.menus = staticRoutes
          this.flatMenus = this.menus
        }
        else {
          const { menus } = await getUserPermissions()
          this.menus = menus
          this.flatMenus = flatRoutes(this.menus)
        }

        this.flatMenus.forEach((item: RouteRecordRaw) => {
          item.children && delete item.children
          if (typeof item.component === 'string') {
            // @ts-expect-error ignore
            item.component = modules[`/src/views${item.component}.vue`]
          }
          // if (item.meta.isFull) {
          //   router.addRoute(item as unknown as RouteRecordRaw);
          // } else {
          //   router.addRoute("layout", item as unknown as RouteRecordRaw);
          // }
          router.addRoute('layout', item as unknown as RouteRecordRaw)
        })
      }
      catch (error) {
        console.error('Failed to generate routes')
        userStore.logout()
        return Promise.reject(new Error('Failed to generate routes'))
      }
    },
    resetRoutes() {
      this.flatMenus.forEach((route) => {
        const { name } = route
        if (name && router.hasRoute(name))
          router.removeRoute(name)
      })
    },
    setCurrentRouteName(name: string) {
      this.currentRouteName = name
    },
  },
})
