import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const homepage: RouteRecordRaw = {
  name: 'HomeLayout',
  path: '/home',
  component: Layout,
  redirect: '/home/index',
  meta: {
    title: 'Home',
    icon: 'house',
    sort: -1,
    hideChildren: true,
  },
  children: [
    {
      name: 'Home',
      path: 'index',
      component: () => import('@/views/home/index.vue'),
      meta: {
        icon: 'house',
        title: '',
      },
    },
  ],
}

export default homepage
