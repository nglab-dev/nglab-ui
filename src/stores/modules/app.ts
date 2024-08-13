import { defineStore } from 'pinia'

export interface AppState {
  collapsed: boolean
}

export const useAppStore = defineStore(
  'app',
  {
    state: (): AppState => ({
      collapsed: false,
    }),
    persist: {
      key: 'app',
    },
  },
)
