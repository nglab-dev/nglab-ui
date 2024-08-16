import type { RouteRecordRaw, Router } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { PAGE_NOT_FOUND_ROUTE } from './constant'
import { usePermissionStoreWithOut, useUserStoreWithOut } from '@/store'

NProgress.configure({ showSpinner: false })

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const permissionStore = usePermissionStoreWithOut()
    const userStore = useUserStoreWithOut()
    const { whiteRoutePaths } = permissionStore

    if (userStore.token) {
      if (to.path === '/login') {
        next()
        return
      }
      try {
        await userStore.getUserInfo()

        const { asyncRoutes } = permissionStore

        if (asyncRoutes && asyncRoutes.length === 0) {
          const routeList = await permissionStore.buildAsyncRoutes()
          routeList.forEach((item: RouteRecordRaw) => {
            router.addRoute(item)
          })

          if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
          // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            next({ path: to.fullPath, replace: true, query: to.query })
          }
          else {
            const redirect = decodeURIComponent((from.query.redirect || to.path) as string)
            next(to.path === redirect ? { ...to, replace: true } : { path: redirect, query: to.query })
            return
          }
        }

        if (router.hasRoute(to.name!)) {
          next()
        }
        else {
          next(`/`)
        }
      }
      catch (error: any) {
        ElMessage.error(error.message)
        next({
          path: '/login',
          query: { redirect: encodeURIComponent(to.fullPath) },
        })
        NProgress.done()
      }
    }

    else {
    /* white list router */
      if (whiteRoutePaths.includes(to.path)) {
        next()
      }
      else {
        next({
          path: '/login',
          query: { redirect: encodeURIComponent(to.fullPath) },
        })
      }
      NProgress.done()
    }
  })

  router.afterEach((to) => {
    if (to.path === '/login') {
      const userStore = useUserStoreWithOut()
      const permissionStore = usePermissionStoreWithOut()

      userStore.logout()
      permissionStore.restoreRoutes()
    }
    NProgress.done()
  })
}
