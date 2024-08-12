import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import AppLayout from '@/layouts/index.vue'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// const WHITE_LIST = [
//   { name: 'login', children: [] },
// ]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/error/404.vue'),
    },
  ],
})

// router.beforeEach(async (to, from, next) => {
//   NProgress.start()

//   if (!userToken.value) {
//     if (WHITE_LIST.some(el => el.name === to.name))
//       return next()
//     return next('/login')
//   }

//   if (to.path === '/login') {
//     return next({ path: '/' })
//   }

//   return next()
// })

// router.afterEach(() => {
//   NProgress.done()
// })

export default router
