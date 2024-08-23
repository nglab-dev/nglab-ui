import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

export const install: UserPlugin = (app) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
}
