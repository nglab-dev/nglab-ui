import type { RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      icon: 'House',
      title: 'menu.home',
      affixTab: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.md'),
    meta: {
      icon: 'ChatLineSquare',
      title: 'menu.about',
    },
  },
]
