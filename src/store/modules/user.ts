import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { AuthUserInfoResult, LoginRequest } from '@/api/auth'
import { getAuthUser, login, logout } from '@/api/auth'

export interface UserState {
  /**
   * 用户token
   */
  token: string
  /**
   * 用户信息
   */
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
      async logout() {
        await logout()
        this.$reset()
      },
    },
    persist: {
      key: 'store-user',
      paths: ['token'],
    },
  },
)
