import type { RouteRecordRaw } from 'vue-router'

// 固定路由模块转换为路由
export function mapModuleRouterList(modules: Record<string, any>): Array<RouteRecordRaw> {
  const routerList: Array<RouteRecordRaw> = []
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routerList.push(...modList)
  })
  return routerList
}
