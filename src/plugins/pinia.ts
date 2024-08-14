import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export const install: UserPlugin = (app) => {
  app.use(pinia)
}
