import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import store from '@/store'
import type { AuthUserInfoResult, LoginRequest } from '@/api/auth'
import { getAuthUser, login } from '@/api/auth'

export interface UserState {
  /**
   * 用户token
   */
  token: string

  userInfo: AuthUserInfoResult | null
}

export const useUserStore = defineStore(
  'store-user',
  {
    state: (): UserState => ({
      token: '',
      userInfo: null,
    }),
    getters: {
      isLogin(): boolean {
        return !!this.token
      },
    },
    actions: {
      async login(params: LoginRequest) {
        try {
          const { token } = await login(params)
          this.token = token
          this.getUserInfo()
        }
        catch (error: Error | any) {
          ElMessage.error(error.message)
        }
      },
      async getUserInfo() {
        const res = await getAuthUser()
        this.userInfo = res
      },
      logout() {
        this.$reset()
      },
    },
    persist: {
      key: 'store-user',
      paths: ['token'],
    },
  },
)

export function useUserStoreWithOut() {
  return useUserStore(store)
}
