import { request } from '@/utils/request'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export interface UserMenuResult {
  list: Array<RouteItem>
}

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface RouteItem {
  path: string
  name: string
  component?: Component | string
  components?: Component
  redirect?: string
  meta: RouteRecordMeta
  children?: Array<RouteItem>
}

export interface AuthUserInfoResult {
  userId: number
  username: string
  nickname: string
  avatar: string
  roles: string[]
}

// get auth user
export function getAuthUser() {
  return request.get<AuthUserInfoResult>({
    url: '/user',
  })
}

// login
export function login(data: LoginRequest) {
  return request.post<LoginResult>({
    url: '/login',
    data,
  })
}

// get auth user menu
export function getUserMenu() {
  return request.get<RouteItem[]>({
    url: '/menu',
  })
}
