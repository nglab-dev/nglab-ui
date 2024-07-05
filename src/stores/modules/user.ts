import { defineStore } from 'pinia'
import type { LoginRequest } from '@/api/auth'
import { loginAction } from '@/api/auth'
import store from '@/stores'

export const useUserStore = defineStore('user', () => {
  const login = async ({ username, password }: LoginRequest) => {
    const { data } = await loginAction({ username, password })
    userToken.value = data?.access_token
  }

  return { login }
})

export function useUserStoreOutside() {
  return useUserStore(store)
}
