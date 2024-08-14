import { defineStore } from 'pinia'

export interface AppState {
  isCollapsed: boolean
  colorMode: string
  language: string
}

export const useAppStore = defineStore(
  'app',
  {
    state: (): AppState => ({
      isCollapsed: false,
      language: 'en',
      colorMode: 'auto', // auto, dark, light
    }),
    actions: {

    },
    persist: {
      key: 'app',
    },
  },
)
