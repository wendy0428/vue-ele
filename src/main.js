import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 手淘 H5 适配
import 'amfe-flexible/index.js'
import { Button, Cell,Toast} from 'mint-ui'
Vue.component(Button.name, Button);

Vue.prototype.$Toast = Toast;


Vue.config.productionTip = false

Vue.prototype.axios = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
