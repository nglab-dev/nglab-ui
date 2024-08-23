import type { RouteRecordRaw } from 'vue-router'

export function flatRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const copyRoutes: RouteRecordRaw[] = JSON.parse(JSON.stringify(routes))
  return copyRoutes.flatMap(item => [item, ...(item.children ? flatRoutes(item.children) : [])])
}

export function filterRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const copyRoutes: RouteRecordRaw[] = JSON.parse(JSON.stringify(routes))
  return copyRoutes.filter((item) => {
    item.children?.length && (item.children = filterRoutes(item.children))
    return !item.meta?.hideInMenu
  })
}

export function buildBreadcrumbs(routes: RouteRecordRaw[], parent = [], result: { [key: string]: any } = {}): Recordable {
  for (const item of routes) {
    result[item.path] = [...parent, item]
    if (item.children)
      buildBreadcrumbs(item.children, result[item.path], result)
  }
  return result
}
