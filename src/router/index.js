import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.路由懒加载: 当打包构建应用时,JavaScript 的包会变得非常大,影响页面加载.
// 所以,我们能把不同路由对应的组件分割成不同的代码块,然后当路由被访问的时候才加载对应组件,这样就更加高效了.
const Home = () => import("@/components/home/home")

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
]

const router = new VueRouter({
  routes
})

export default router
