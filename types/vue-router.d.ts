import 'vue-router'

declare module 'vue-router' {

  interface RouteMeta {
    // title
    title?: string
    // roles
    roles?: RoleType[]
    // hide
    hide?: boolean
    // sort
    sort?: number
  }
}
