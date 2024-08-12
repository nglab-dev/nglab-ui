import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import i18n from './locales'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/global.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')

export default app
