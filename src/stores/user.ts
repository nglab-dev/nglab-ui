import { defineStore } from 'pinia'

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
  'app',
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

    },
    persist: {
      key: 'user',
    },
  },
)
