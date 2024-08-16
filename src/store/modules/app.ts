import { defineStore } from 'pinia'

export type LayoutType = 'vertical'

export interface AppState {
  isCollapsed: boolean
  language: string
  watermark: boolean
  layout: LayoutType
}

export const useAppStore = defineStore(
  'store-app',
  {
    state: (): AppState => ({
      isCollapsed: false,
      language: 'en',
      watermark: false,
      layout: 'vertical',
    }),
    actions: {

    },
    persist: {
      key: 'store-app',
    },
  },
)
