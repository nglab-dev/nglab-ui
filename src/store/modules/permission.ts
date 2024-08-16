import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import router, { fixedRoutes, homepageRoutes } from '@/router'
import type { RouteItem } from '@/api/auth'
import { getUserMenu } from '@/api/auth'
import { transformObjectToRoute } from '@/router/utils'
import store from '@/store'

export interface PermissionState {
  whiteRoutePaths: string[]
  routes: RouteRecordRaw[]
  asyncRoutes: RouteRecordRaw[]
}

export const usePermissionStore = defineStore('store-permission', {
  state: (): PermissionState => ({
    whiteRoutePaths: ['/login'],
    routes: [],
    asyncRoutes: [],
  }),
  actions: {
    async initRoutes() {
      const accessedRoutes = this.asyncRoutes

      // 在菜单展示全部路由
      this.routes = [...homepageRoutes, ...accessedRoutes, ...fixedRoutes]
      // 在菜单只展示动态路由和首页
      // this.routers = [...homepageRouterList, ...accessedRouters];
      // 在菜单只展示动态路由
      // this.routers = [...accessedRouters];
    },
    async buildAsyncRoutes() {
      try {
        // 发起菜单权限请求 获取菜单列表
        const menus = await getUserMenu()
        this.asyncRoutes = transformObjectToRoute(menus)
        await this.initRoutes()
        return this.asyncRoutes
      }
      catch (error) {
        throw new Error('Can\'t build routes')
      }
    },
    async restoreRoutes() {
      // 不需要在此额外调用initRoutes更新侧边导肮内容，在登录后asyncRoutes为空会调用
      this.asyncRoutes.forEach((item: RouteRecordRaw) => {
        if (item.name) {
          router.removeRoute(item.name)
        }
      })
      this.asyncRoutes = []
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
