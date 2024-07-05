import { api, path } from '@/utils/api'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export function loginAction(req: LoginRequest) {
  return api.post<LoginResponse>(path`/login`, req)
}
