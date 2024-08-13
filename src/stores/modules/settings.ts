import { defineStore } from 'pinia'

export interface SettingsState {
  theme: string
  language: string
  isDark: boolean
}

export const useSettingsStore = defineStore(
  'app-settings',
  () => {
    const state: SettingsState = {
      theme: 'light',
      language: 'en',
      isDark: false,
    }

    return {
      state,
    }
  },
  {
    persist: {
      key: 'app-settings',
    },
  },
)
