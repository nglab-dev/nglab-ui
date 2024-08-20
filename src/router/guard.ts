import type { Router } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { usePermissionStoreWithOut, useUserStoreWithOut } from '@/store'

NProgress.configure({ showSpinner: false })

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const permissionStore = usePermissionStoreWithOut()
    const userStore = useUserStoreWithOut()
    // 1. 是否登录
    if (!userStore.isLogin) {
      if (to.path === '/login') {
        next()
      }
      else {
        const redirect = to.name === '404' ? undefined : to.fullPath
        next({ path: '/login', query: { redirect } })
      }
      return false
    }

    await permissionStore.generateRoutes()

    if (to.path === '404') {
      next({
        path: to.fullPath,
        replace: true,
        query: to.query,
        hash: to.hash,
      })
      return false
    }

    if (to.path === '/login') {
      next({ path: '/' })
      return false
    }

    next()
  })

  router.afterEach((to) => {
    const title = useTitle()
    title.value = `${to.meta.title} - ${title.value}`
    NProgress.done()
  })
}
