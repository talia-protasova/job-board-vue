import { createApp } from 'vue'

import App from './App.vue'
import { router } from './app/providers/router'
import './app/styles/index.scss'

createApp(App).use(router).mount('#app')
