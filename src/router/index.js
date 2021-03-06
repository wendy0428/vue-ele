import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.路由懒加载: 当打包构建应用时,JavaScript 的包会变得非常大,影响页面加载.
// 所以,我们能把不同路由对应的组件分割成不同的代码块,然后当路由被访问的时候才加载对应组件,这样就更加高效了.

Vue.use(VueRouter)

  const routes = [
    {
        path: '/', // 首页
        name: 'Home',
        component: () => import("@/components/home/home")
    },
    // 动态路由匹配,某种模式匹配到的所有路由,全部映射到同个组件上.
    {
        path: '/city/:id', // 当前城市页
        name: 'City',
        component: () => import("@/components/city/city")
    },
    {
        path: '/msite', // 商铺列表
        name: 'Msite',
        component: () => import("@/components/msite/msite")
    },
    {
        path: '/food',  // 食品筛选排序页
        name: 'Food',
        component: () => import("@/components/food/food")
    },
    // 嵌套命名视图: (同级) 展示多个视图，而不是嵌套展示
    {
        path: '/shop',  // 商铺详情页
        name: 'Shop',
        component: () => import("@/components/shop/shop"),
        children:[{
            path:'shopDetail', // 商家信息
            component: () => import("@/components/shop/children/shopDetail"),
            children:[{
                path:'shopSafe', // 食品监督安全公示
                component: () => import("@/components/shop/children/children/shopSafe")
            }]
        },{
            path: 'foodDetail',// 食品详情
            component: () => import("@/components/shop/children/foodDetail"),
        }],
    },
    {
        path: '/confirmOrder', // 订单确认页面
        name: 'ConfirmOrder',
        component: () => import("@/components/confirmOrder/confirmOrder"),
        children:[{
            path: 'remark', //订单备注
            component: () => import("@/components/confirmOrder/children/remark"),
        },{
            path: 'invoice', // 发票抬头
            component: () => import("@/components/confirmOrder/children/invoice"),
        },{
            path: 'chooseAddress', // 选择地址
            component: () => import("@/components/confirmOrder/children/chooseAddress"),
            children:[{
                path: 'addAddress', // 添加地址
                component: () => import("@/components/confirmOrder/children/children/addAddress"),
                children:[{
                    path: 'searchAddress', // 搜索地址
                    component: () => import("@/components/profile/children/children/children/children/addDetail"),
                }],
            }]
        },{
            path: 'payment', // 支付页面
            component: () => import("@/components/confirmOrder/children/payment"),
        }]
    },
    {
        path: '/login', // 登录注册页面
        name: 'Login',
        component: () => import("@/components/login/login"),
    },{
        path: '/profile', // 个人中心
        name: 'Profile',
        component: () => import("@/components/profile/profile"),
        children:[{
            path:'info', // 账户信息 退出登录
            component: () => import("@/components/profile/children/info"),
            children: [
                {
                    path: 'setUserName', // 设置用户名
                    component: () => import("@/components/profile/children/children/setUserName"),
                },{
                    path: 'address', // 编辑地址
                    component: () => import("@/components/profile/children/children/address"),
                    children: [{
                        path: 'add', // 新增地址
                        component: () => import("@/components/profile/children/children/children/add"),
                        children:[{
                            path: 'addDetail', // 搜索地址
                            component: () => import("@/components/profile/children/children/children/children/addDetail"),
                        }],
                    }],
                }
            ]
        }]
    },
    {
        path: '/forget', // 重置密码
        name: 'Forget',
        component: () => import("@/components/forget/forget"),
    },
    {
        path: '/order', // 订单列表
        name: 'Order',
        component: () => import("@/components/order/order"),
        children:[{
            path: 'orderDetail', // 订单详情
            component: () => import("@/components/order/children/orderDetail"),
        }],
    },
    {
        path: '/search', // 搜索商家或者食品名称
        name: 'Search',
        component: () => import("@/components/search/search"),
    },
    {
        path: '/service', // 服务中心
        name: 'Service',
        component: () => import("@/components/service/service"),
        children:[{
            path: 'questionDetail',
            component:() => import("@/components/service/children/questionDetail"),
        }],
    },
    {
        path: '/download', // 搜索商家或者食品名称
        name: 'Download',
        component: () => import("@/components/download/download"),
    },
    {
        path: '/vipcard', // 搜索商家或者食品名称
        name: 'Vipcard',
        component: () => import("@/components/vipcard/vipcard"),
        children:[{
            path: 'vipDescription',
            component: () => import("@/components/vipcard/children/vipDescription"),
        }],
    },
    {
        path: '/points', // 积分中心
        name: 'Points',
        component: () => import("@/components/points/points"),
        children:[{ 
            path: 'detail', //积分问题
            component: () => import("@/components/points/children/detail"),
        }],
    },
    {
        path: '/balance', // 我的余额
        name: 'Balance',
        component: () => import("@/components/balance/balance"),
        children:[{ 
            path: 'detail', //积分问题
            component: () => import("@/components/balance/children/detail"),
        }],
    },
]

const router = new VueRouter({
	routes
})

export default router
