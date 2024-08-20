import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { formatModules } from './utils'
import { createRouterGuard } from './guard'

const modules = import.meta.glob('./modules/*.ts', { eager: true })

export const staticRoutes: RouteRecordRaw[] = formatModules(modules, [])

export const fixedRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home/index',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Login',
    },
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/errors/404.vue'),
    meta: {
      title: '404',
    },
  },
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTE_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [...staticRoutes, ...fixedRoutes],
  strict: false,
})

// router guard
createRouterGuard(router)

export default router
