import type { RouteRecordRaw } from 'vue-router'
import { request } from '@/utils/request'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export interface AuthUserInfoResult {
  id: number
  username: string
  nickname: string
  avatar: string
  roles: string[]
}

export interface PermissionResult {
  menus: RouteRecordRaw[]
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

// logout
export function logout() {
  return request.post({
    url: '/logout',
  })
}

// get auth user menu
export function getUserPermissions() {
  return request.get<PermissionResult>({
    url: '/permissions',
  })
}
