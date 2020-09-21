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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 购物车功能的实现

* 第一步: 从接口中获取商品中的数据.
* 第二步: 增加或者减少购物车商品时,将商品分别 保存到 vuex 中的 cartList 中;localStorage 中的 buyCart 中.

	* 数据格式为:
    ```js
	let cartList = {
		    shopid: 'xxx',
			category_id:{
				item_id:{
					food_id:{
						"num" : 1,
						"id" : food_id,
						"name" : name,
						"price" : price,
						"specs" : specs,
						"packing_fee" : packing_fee,
						"sku_id" : sku_id,
						"stock" : stock
					},
					food_id:{
						"num" : 1,
						"id" : food_id,
						"name" : name,
						"price" : price,
						"specs" : specs,
						"packing_fee" : packing_fee,
						"sku_id" : sku_id,
						"stock" : stock
					}
				},
			},
		},
    };
    // shopid: '商铺 id'
    // category_id: 9196 '食品分类 id'
    // item_id: 6086  '食品 id' specfoods里面的item_id
    // food_id: 23725  '食品规格 id' specfoods里面的food_id
    // name: ew1   '食品名称' name  specfoods里面的name
    // price: 20   '食品价格'  specfoods里面的price
    // specs:     '食品规格'  specfoods里面的specs
    // packing_fee: 0 '打包费' specfoods里面的specfoods里面的specs
    // sku_id: 23698 
    // stock: 1000
    ```

* 第三步: 页面初始化,因为 vuex 在页面刷新的时候会丢失,所以从缓存中去获取购物车中的数据,赋值给 vuex 中的 cartList 变量,在页面中的计算属性中,去监听该遍历,只要购物车 cartList 变化,就重新去计算购物车商品总数量、购物车总价格、购物车商品列表(将多维对象转为一维数组),渲染页面.
* 第四步: 清空购物车,将当前 vuex 中的 cartList 中;localStorage 中的 buyCart对应的 shopid,属性值为 null
