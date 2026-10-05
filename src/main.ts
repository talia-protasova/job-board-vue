import { createApp } from 'vue'

import App from './App.vue'
import { router } from './app/providers/router'
import { initTheme } from './features/theme-toggle/model/useTheme.ts'

import './app/styles/index.scss'

initTheme()

createApp(App).use(router).mount('#app')
