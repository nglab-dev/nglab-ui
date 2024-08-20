import { defineStore } from 'pinia'

export type LayoutType = 'vertical'

export type MenuLoadType = 'static' | 'dynamic'

export interface AppState {
  isCollapsed: boolean
  language: string
  watermark: boolean
  layout: LayoutType
  menuLoadType: MenuLoadType
}

export const useAppStore = defineStore(
  'store-app',
  {
    state: (): AppState => ({
      isCollapsed: false,
      language: 'en',
      watermark: false,
      layout: 'vertical',
      menuLoadType: 'static',
    }),
    actions: {

    },
    persist: {
      key: 'store-app',
    },
  },
)
