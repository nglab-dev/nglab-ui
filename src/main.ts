import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import '@unocss/reset/tailwind.css'

import App from './App.vue'
import './assets/main.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.mount('#app')
