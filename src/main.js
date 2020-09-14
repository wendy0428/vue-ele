import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 手淘 H5 适配
import 'amfe-flexible/index.js'

// 引入 Mint-ui 组件库
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入自定义样式去覆盖 mint-ui的样式
import './assets/css/mint.css'


Vue.use(MintUI)

Vue.config.productionTip = false

Vue.prototype.axios = axios

axios.defaults.baseURL = '/api';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
