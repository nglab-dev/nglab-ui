export const LAYOUT = () => import('@/layouts/index.vue')
export const BLANK_LAYOUT = () => import('@/layouts/blank.vue')
export const IFRAME = () => import('@/layouts/iframe.vue')
export const EXCEPTION_COMPONENT = () => import('@/views/error/500.vue')
export function PARENT_LAYOUT() {
  return new Promise((resolve) => {
    resolve({ name: 'ParentLayout' })
  })
}

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:w+',
  name: '404Page',
  redirect: '/result/404',
}
