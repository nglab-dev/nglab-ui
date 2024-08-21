import type { RouteRecordRaw } from 'vue-router'
import { usePermissionStore } from '@/store'

export function useMenuTree() {
  const permissionStore = usePermissionStore()
  const { hasPermission } = useUserPermission()

  const appRoute = computed(() => {
    return permissionStore.routes
  })

  const menuTree = computed(() => {
    const copyRouter = JSON.parse(JSON.stringify(appRoute.value))
    // 排序
    copyRouter.sort((a: RouteRecordRaw, b: RouteRecordRaw) => {
      return (Number(a.meta?.sort) || 0) - (Number(b.meta?.sort) || 0)
    })
    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes)
        return null

      const collector: any = _routes.map((element) => {
        // no access
        if (!hasPermission(element.meta?.roles))
          return null

        // leaf node
        if (element.meta?.hideChildren || !element.children) {
          element.children = []
          return element
        }

        // route filter hideInMenu true
        element.children = element.children.filter(x => x.meta?.hideInMenu !== true)

        // Associated child node
        const subItem = travel(element.children, layer + 1)

        if (subItem.length > 0) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (element.meta?.hide === false)
          return element

        return null
      })
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0)
  })

  return {
    menuTree,
  }
}
