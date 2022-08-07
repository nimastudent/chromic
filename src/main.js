import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import App from './App.vue'
import store from './store'
import router from './router'
import formCreate from '@form-create/element-ui'

const app = createApp(App)
app.use(ElementPlus, { size: store.state.app.elementSize })
app.use(formCreate)
app.use(store)
app.use(router)

app.mount('#app')
