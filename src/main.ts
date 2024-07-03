import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import 'primeicons/primeicons.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles/main.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.use(router)
app.use(pinia)

app.mount('#app')
