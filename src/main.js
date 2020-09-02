import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 手淘 H5 适配
import 'amfe-flexible/index.js'

Vue.config.productionTip = false

Vue.prototype.axios = axios
// axios 全局配置
axios.defaults.timeout = 15000;  //超时响应
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头（推荐）
// axios.defaults.baseURL = $core.use('http'); //确认协议和地址
axios.defaults.withCredentials = true;   // axios 默认不发送cookie，需要全局设置true发送cooki

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
