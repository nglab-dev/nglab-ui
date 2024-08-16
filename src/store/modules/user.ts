import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { usePermissionStore } from './permission'
import store from '@/store'
import { type LoginRequest, getAuthUser, login } from '@/api/auth'

export interface UserState {
  /**
   * 用户id
   */
  id: number
  /**
   * 用户token
   */
  token: string
  /**
   * 用户名
   */
  username: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 角色
   */
  roles: string[]
}

export const useUserStore = defineStore(
  'store-user',
  {
    state: (): UserState => ({
      id: 0,
      token: '',
      username: '',
      nickname: '',
      avatar: '',
      roles: [],
    }),
    actions: {
      setUserInfo(partial: Partial<UserState>) {
        this.$patch(partial)
      },
      async login(params: LoginRequest) {
        try {
          const { token } = await login(params)
          this.setUserInfo({ token })
          this.getUserInfo()
        }
        catch (error: Error | any) {
          ElMessage.error(error.message)
        }
      },
      async getUserInfo() {
        const res = await getAuthUser()
        this.setUserInfo(res)
      },
      async logout() {
        this.$reset()
      },
    },
    persist: {
      afterRestore: () => {
        const permissionStore = usePermissionStore()
        permissionStore.initRoutes()
      },
      key: 'store-user',
      paths: ['token'],
    },
  },
)

export function useUserStoreWithOut() {
  return useUserStore(store)
}
