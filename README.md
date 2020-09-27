# vue-ele

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 项目布局
```bash
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── [√] alertTip.vue                // 弹出框组件
│   │   │   ├── [√] buyCart.vue                 // 购物车组件
│   │   │   ├── [x] loading.vue                 // 页面初始化加载数据的动画组件
│   │   │   ├── [√] ratingStar.vue              // 评论的五颗星组件
│   │   │   └── [√] shoplist.vue                // msite和shop页面的餐馆列表公共组件
│   │   ├── footer
│   │   │   └── [√] footGuide.vue               // 底部公共组件
│   │   │── header
│   │   │   └── [√] head.vue                    // 头部公共组件
│   │   ├── balance
│   │   │   ├── [√] balance.vue                 // 余额页
│   │   │   └── children
│   │   │       └── [√] detail.vue              // 余额说明
│   │   ├── benefit
│   │   │   ├── [x] benefit.vue                 // 红包页
│   │   │   └── children
│   │   │       ├── [x] commend.vue             // 推荐有奖
│   │   │       ├── [x] coupon.vue              // 代金券说明
│   │   │       ├── [x] exchange.vue            // 兑换红包
│   │   │       ├── [x] hbDescription.vue       // 红包说明
│   │   │       └── [x] hbHistory.vue           // 历史红包
│   │   ├── city
│   │   │   └── [√] city.vue                    // 当前城市页
│   │   ├── confirmOrder
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── [√] addAddress.vue          // 添加地址页
│   │   │   │   │   └── children
│   │   │   │   │       └── [√] searchAddress.vue   // 搜索地址页
│   │   │   │   ├── [√] chooseAddress.vue           // 选择地址页
│   │   │   │   ├── [√] invoice.vue                 // 选择发票页
│   │   │   │   ├── [√] payment.vue                 // 付款页
│   │   │   │   ├── [√] remark.vue                  // 订单备注页
│   │   │   │   └── [x] userValidation.vue          // 用户验证页
│   │   │   └── [√] confirmOrder.vue                // 确认订单页
│   │   ├── download
│   │   │   └── [√] download.vue                    // 下载App
│   │   ├── find
│   │   │   └── [x] find.vue                        // 发现页
│   │   ├── food
│   │   │   └── [√] food.vue                        // 食品筛选排序页
│   │   ├── forget
│   │   │   └── [√] forget.vue                      // 忘记密码，修改密码页
│   │   ├── home
│   │   │   └── [√] home.vue                        // 首页
│   │   ├── login
│   │   │   └── [√] login.vue                       // 登录注册页
│   │   ├── msite
│   │   │   └── [√] msite.vue                       // 商铺列表页
│   │   ├── order
│   │   │   ├── children
│   │   │   │   └── [√] orderDetail.vue             // 订单详情页
│   │   │   └── [√] order.vue                       // 订单列表页
│   │   ├── points
│   │   │   ├── children
│   │   │   │   └── [√] detail.vue                  // 积分说明
│   │   │   └── [√] points.vue                      // 积分页
│   │   ├── profile
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── [√] address.vue             // 地址
│   │   │   │   │   └── children
│   │   │   │   │       ├── [√] add.vue             // 新增地址
│   │   │   │   │       └── children
│   │   │   │   │           └── [√] addDetail.vue   // 搜索地址
│   │   │   │   ├── [√] info.vue                    // 帐户信息
│   │   │   │   └── [√] setusername.vue             // 重置用户名
│   │   │   └── [√] profile.vue                     // 个人中心
│   │   ├── search
│   │   │   └── [√] search.vue                      // 搜索页
│   │   ├── service
│   │   │   ├── children
│   │   │   │   └── [√] questionDetail.vue          // 问题详情
│   │   │   └── [√] service.vue                     // 服务中心
│   │   ├── shop
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   └── [√] shopSafe.vue            // 商铺认证信息页
│   │   │   │   ├── [√] foodDetail.vue              // 商铺信息页
│   │   │   │   └── [√] shopDetail.vue              // 单个商铺信息页
│   │   │   └── [√] shop.vue                        // 商铺筛选页
│   │   └── vipcard
│   │       ├── children
│   │       │   ├── [x] invoiceRecord.vue           // 购买记录
│   │       │   ├── [x] useCart.vue                 // 使用卡号购买
│   │       │   └── [√] vipDescription.vue          // 会员说明
│   │       └── [√] vipcard.vue                     // 会员卡办理页
│   ├── config                                      // 基本配置
│   │   ├── env.js                                  // 环境切换配置
│   │   ├── axios.js                                // axios 封装
│   │   └── utils.js                                // 常用的js方法
│   ├── router
│   │   └── index.js                                // 路由配置
│   ├── service                                     // 数据交互统一调配
│   │   └── getData                                 // 获取数据的统一调配文件，对接口进行统一管理
│   └──  store                                      // vuex的状态管理
│       └── index.js                                // 引用vuex，创建store
│   ├── assets									    // 公共样式和图片
│   │   ├── css                              	    // 公共的 css
│   │   │   ├── mint.css                            // 修改 mint-ui 组件的样式    
│   │   ├── img                              	    // 图片

│   ├── App.vue                                     // 页面入口文件
│   ├── main.js                                     // 程序入口文件，加载各种公共组件
├── public
│   ├── databases                                   // 接口返回的 json 数据
```
Total 54
