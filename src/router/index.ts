import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { setupGuard } from './guard'
import AppLayout from '~/layout/index.vue'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('~/views/dashboard/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('~/views/login/index.vue'),
    },
  ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupGuard(router)

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
