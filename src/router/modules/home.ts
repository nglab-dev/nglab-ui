import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw[] = [
  {
    component: Layout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'Home',
    },
    name: 'HomeLayout',
    path: '/',
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '',
        },
      },
    ],
  },
]

export default routes
