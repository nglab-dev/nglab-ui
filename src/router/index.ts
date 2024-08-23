import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { createRouterGuard } from './guard'

export const LOGIN_PATH = '/login'

export const HOME_PATH = '/home'

export const fixedRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'login',
    path: LOGIN_PATH,
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_PATH,
    children: [],
  },
]

export const errorRoutes = [
  // {
  //   path: "/403",
  //   name: "403",
  //   component: () => import("@/components/ErrorMessage/403.vue"),
  //   meta: {
  //     title: "403页面"
  //   }
  // },
  // {
  //   path: "/404",
  //   name: "404",
  //   component: () => import("@/components/ErrorMessage/404.vue"),
  //   meta: {
  //     title: "404页面"
  //   }
  // },
  // {
  //   path: "/500",
  //   name: "500",
  //   component: () => import("@/components/ErrorMessage/500.vue"),
  //   meta: {
  //     title: "500页面"
  //   }
  // },
  // Resolve refresh page, route warnings
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/errors/404.vue'),
  },
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTE_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [...fixedRoutes, ...errorRoutes],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// router guard
createRouterGuard(router)

export default router
