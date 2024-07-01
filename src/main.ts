import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import 'uno.css'
import 'vuetify/styles'

const vuetify = createVuetify()

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(pinia)

app.mount('#app')
