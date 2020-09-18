import Vue from "vue";
import Vuex from "vuex";
import {setStore,getStore} from '../config/utils'
Vue.use(Vuex);

// ES6中,用字面量定义对象时,用表达式作为对象的属性名,把表达式放在方括号内
const RECORD_ADDRESS = "RECORD_ADDRESS";
const SAVE_GEOHASH = "SAVE_GEOHASH";
const ADD_CART = "ADD_CART";
const REDUCE_CART = 'REDUCE_CART';
const INIT_BUYCART = 'INIT_BUYCART';
export default new Vuex.Store({
	state: {
    	latitude: "", // 纬度
    	longitude: "", // 经度
    	geograph: "31.22299,121.36025", // 地理位置
    	cartList: {}, // 加入购物车的商品列表
  	},
  	mutations: {
    	// 保存地理位置
    	[RECORD_ADDRESS](state, { longitude, latitude }) {
    	  	state.longitude = longitude;
    	  	state.latitude = latitude;
    	},
    	// 保存地理位置
    	[SAVE_GEOHASH](state, { geograph }) {
    	  	state.geograph = geograph;
    	},
    	// 加入购物车商品列表
    	[ADD_CART](state,{
        	shopid,
        	category_id,
        	item_id,
        	food_id,
        	name,
        	price,
        	specs,
        	packing_fee,
        	sku_id,
        	stock
      	}){
			let cart = state.cartList;
      		let shopId = (cart[shopid] = cart[shopid] || {});
      		let categoryId = (shopId[category_id] = shopId[category_id] || {});
      		let itemId = (categoryId[item_id] = categoryId[item_id] || {});
      		if (itemId[food_id]) {
      		  itemId[food_id]["num"]++;
      		} else{
        		itemId[food_id] = {
				  num: 1,
				  id: food_id,
				  name: name,
				  price: price,
				  specs: specs,
				  packing_fee: packing_fee,
				  sku_id: sku_id,
				  stock: stock
        		};
			}
			console.log('cart',cart,typeof cart);
			state.cartList = {...cart};
			setStore('buyCart',state.cartList);
			// 因为 vuex 页面一刷新,就会丢失,所以要存入到localStorage 中
			console.log('加入',state.cartList);  
		},
		// 移除购物车商品列表
		[REDUCE_CART](state,{
			shopid,
        	category_id,
        	item_id,
        	food_id,
        	name,
        	price,
        	specs,
        	packing_fee,
        	sku_id,
			stock
		}){
			let cart = state.cartList;
      		let shopId = (cart[shopid] = cart[shopid] || {});
      		let categoryId = (shopId[category_id] = shopId[category_id] || {});
			let itemId = (categoryId[item_id] = categoryId[item_id] || {});
			if(itemId[food_id]){
				if(itemId[food_id].num > 1){
					itemId[food_id].num--;
				}else{
					delete(itemId[food_id])
				}
			}
			state.cartList = {...cart};
			setStore('buyCart',state.cartList)
			console.log('减少',state.cartList);  
		},
		// 页面初始化的时候,从本地缓存中获取购物车的数据,因为刷新页面,存储到vuex 中的数据会丢失
		[INIT_BUYCART](state){
			let initData = getStore('buyCart');
			initData = JSON.parse(initData);
			console.log('INIT_BUYCART initData', initData);
			if(initData){
				state.cartList = {...initData};
			}
		}
		
  	},
  	actions: {},
  	modules: {},
});
