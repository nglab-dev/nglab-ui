import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const about: RouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/index',
  meta: {
    title: '关于',
    icon: 'postcard',
    hideChildren: true,
    sort: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/about/index.md'),
      meta: {
        title: '关于',
        icon: 'postcard',
      },
    },
  ],
}
export default about
