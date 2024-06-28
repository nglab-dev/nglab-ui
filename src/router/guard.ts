import type { Router } from 'vue-router'

export function setupGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    next()
  })
}
