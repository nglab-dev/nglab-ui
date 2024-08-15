import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Login',
      showLink: false,
      rank: 101,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      title: 'Redirect',
      showLink: false,
      rank: 102,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/layouts/redirect.vue'),
      },
    ],
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: 'Not Found',
    },
  },
]
