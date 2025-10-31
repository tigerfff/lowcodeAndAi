import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// 安装 Pinia
const pinia = createPinia()
app.use(pinia)

// 安装 Element Plus
app.use(ElementPlus)

// 挂载应用
app.mount('#app')
