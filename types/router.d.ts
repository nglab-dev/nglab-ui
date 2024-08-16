interface RouteRecordMeta {
  title?: string | Record<string, string>
  icon?: string
  expanded?: boolean
  orderNo?: number
  hidden?: boolean
  hiddenBreadcrumb?: boolean
  single?: boolean
  keepAlive?: boolean
  frameSrc?: string
  frameBlank?: boolean
}

interface MenuRoute {
  path: string
  title?: string | Record<string, string>
  name?: string
  icon?:
    | string
    | {
      render: () => void
    }
  redirect?: string
  children: MenuRoute[]
  meta: RouteMeta
}
