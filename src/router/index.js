import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.路由懒加载: 当打包构建应用时,JavaScript 的包会变得非常大,影响页面加载.
// 所以,我们能把不同路由对应的组件分割成不同的代码块,然后当路由被访问的时候才加载对应组件,这样就更加高效了.
const Home = () => import("@/components/home/home")
const City = () => import("@/components/city/city")
Vue.use(VueRouter)

  const routes = [
    {
        path: '/', // 首页
        name: 'Home',
        component: Home
    },
    // 动态路由匹配,某种模式匹配到的所有路由,全部映射到同个组件上.
    {
        path: '/city/:id', // 当前城市页
        name: 'City',
        component: City
    },
]

const router = new VueRouter({
  routes
})

export default router
