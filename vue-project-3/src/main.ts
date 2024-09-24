import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import "@ms-ui-3/basic/style.css"

const app = createApp(App)

app.use(router)

app.mount('#app')
