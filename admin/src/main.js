import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入登录界面用到的粒子库
import Particles from 'particles.vue3'
import '@/util/axios.config'


createApp(App)
.use(Particles)
.use(ElementPlus)
.use(store)
.use(router)
.mount('#app')
