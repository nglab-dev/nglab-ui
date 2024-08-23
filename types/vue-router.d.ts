import 'vue-router'

declare module 'vue-router' {

  interface RouteMeta {
    // icon
    icon?: string
    // title
    title?: string
    // roles
    roles?: RoleType[]
    // hide in menu
    hideInMenu?: boolean
    // hideChildren in menu
    hideChildrenInMenu?: boolean
    // sort
    sort?: number
    // active
    actived?: boolean
    // affix tab
    affixTab?: boolean
    // keep alive
    keepAlive?: boolean
  }
}
