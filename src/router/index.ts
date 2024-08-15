import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { mapModuleRouterList } from './utils'

NProgress.configure({ showSpinner: false })

// 导入homepage相关固定路由
const homepageModules = import.meta.glob('./modules/**/homepage.ts', { eager: true })

// 导入modules非homepage相关固定路由
const fixedModules = import.meta.glob('./modules/**/!(homepage).ts', { eager: true })

// 其他固定路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
]

// 存放固定路由
export const homepageRouterList: Array<RouteRecordRaw> = mapModuleRouterList(homepageModules)
export const fixedRouterList: Array<RouteRecordRaw> = mapModuleRouterList(fixedModules)

export const routes = [...homepageRouterList, ...fixedRouterList, ...defaultRouterList]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTE_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
  // 是否应该禁止尾部斜杠。
  strict: false,
})

// router guard
router.beforeEach(async (to, from, next) => {
  next()
})

router.afterEach(() => {
  NProgress.done()
})

router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

export default router
