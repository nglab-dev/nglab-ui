import type { Router } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { usePermissionStore, useUserStore } from '@/store'

NProgress.configure({ showSpinner: false })

export const ROUTER_WHITE_PATHS: string[] = ['/500']

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    // const { t } = useI18n()

    // 1.NProgress 开始
    NProgress.start()

    // 2.动态设置标题
    // const appTitle = import.meta.env.VITE_APP_TITLE
    // const title = t(to.meta.title || '')
    // document.title = title ? `${title} - ${appTitle}` : appTitle

    // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
    if (to.path.toLocaleLowerCase() === '/login') {
      if (userStore.isLogin)
        return next(from.fullPath)
      permissionStore.resetRoutes()
      return next()
    }

    // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
    if (ROUTER_WHITE_PATHS.includes(to.path))
      return next()

    // 5.判断是否有 Token，没有重定向到 login 页面
    if (!userStore.isLogin)
      return next({ path: '/login', replace: true })

    // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
    if (!permissionStore.menus.length) {
      await permissionStore.buildRoutes()
      return next({ ...to, replace: true })
    }

    // 7.存储 routerName 做按钮权限筛选
    permissionStore.setCurrentRouteName(to.name as string)

    // 8.正常访问页面
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError((error) => {
    NProgress.done()
    console.warn('路由错误', error.message)
  })
}
