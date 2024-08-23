import { defineStore } from 'pinia'

export type LayoutMode = 'vertical'

export type MenuMode = 'static' | 'dynamic'

export interface AppState {
  // inner state
  collapsed: boolean
  contentMaxmized: boolean

  // extra state
  language: string
  watermark: boolean
  layoutMode: LayoutMode
  menuMode: MenuMode
}

export const useAppStore = defineStore(
  'store-app',
  {
    state: (): AppState => ({
      collapsed: false,
      contentMaxmized: false,

      language: 'en',
      watermark: false,
      layoutMode: 'vertical',
      menuMode: 'static',
    }),
    actions: {

    },
    persist: {
      key: 'store-app',
    },
  },
)
