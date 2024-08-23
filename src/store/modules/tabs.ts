import { defineStore } from 'pinia'
import router from '@/router'

export interface TabItem {
  icon: string
  title: string
  path: string
  name: string
  close: boolean
  keepAlive: boolean
}

export interface Tabstate {
  cacheList: Set<string>
  tabList: TabItem[]
}

export const useTabsStore = defineStore(
  'store-tabs',
  {
    state: (): Tabstate => ({
      cacheList: new Set(),
      tabList: [],
    }),
    getters: {
      getCacheList(): string[] {
        return Array.from(this.cacheList)
      },
    },
    actions: {
      addCache(tab: string) {
        this.cacheList.add(tab)
      },
      removeCache(tab: string) {
        this.cacheList.delete(tab)
      },
      setCache(tabs: string[]) {
        this.cacheList = new Set(tabs)
      },

      // add tab
      async addTab(item: TabItem) {
        if (this.tabList.every(tab => tab.path !== item.path)) {
          this.tabList.push(item)
        }
        if (item.keepAlive) {
          this.cacheList.add(item.name)
        }
      },
      // remove tab
      async removeTab(tabPath: string, isCurrent: boolean = true) {
        if (isCurrent) {
          this.tabList.forEach((item, index) => {
            if (item.path !== tabPath)
              return
            const nextTab = this.tabList[index + 1] || this.tabList[index - 1]
            if (!nextTab)
              return
            router.push(nextTab.path)
          })
        }
        // remove keepalive
        const tabItem = this.tabList.find(item => item.path === tabPath)
        tabItem?.keepAlive && this.removeCache(tabItem.path)
        // set tabs
        this.tabList = this.tabList.filter(item => item.path !== tabPath)
      },
      // close all tabs, direction: left or right
      async closeByDirection(path: string, direction: 'left' | 'right') {
        const currentIndex = this.tabList.findIndex(item => item.path === path)
        if (currentIndex !== -1) {
          const range = direction === 'left' ? [0, currentIndex] : [currentIndex + 1, this.tabList.length]
          this.tabList = this.tabList.filter((item, index) => {
            return index < range[0] || index >= range[1] || !item.close
          })
        }
        // set keepalive
        const keepAliveList = this.tabList.filter(item => item.keepAlive)
        this.setCache(keepAliveList.map(item => item.path))
      },

      async closeAll(tabsMenuValue?: string) {
        this.tabList = this.tabList.filter((item) => {
          return item.path === tabsMenuValue || !item.close
        })
        // set keepalive
        const keepAliveList = this.tabList.filter(item => item.keepAlive)
        this.setCache(keepAliveList.map(item => item.path))
      },

      async setTabList(items: TabItem[]) {
        this.tabList = items
      },

      async setTabsTitle(title: string) {
        const mode = import.meta.env.VITE_ROUTE_MODE
        const path = mode === 'hash' ? location.hash.substring(1) : location.pathname + location.search
        this.tabList.forEach((item) => {
          if (item.path === path)
            item.title = title
        })
      },
    },
    persist: {
      key: 'store-tabs',
    },
  },
)
