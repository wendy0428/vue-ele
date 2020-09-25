import Vue from "vue";
import Vuex from "vuex";
import {setStore,getStore,delStore} from '../config/utils'
Vue.use(Vuex);

// ES6中,用字面量定义对象时,用表达式作为对象的属性名,把表达式放在方括号内
const RECORD_ADDRESS = "RECORD_ADDRESS";
const SAVE_GEOHASH = "SAVE_GEOHASH";
const ADD_CART = "ADD_CART";
const REDUCE_CART = 'REDUCE_CART';
const INIT_BUYCART = 'INIT_BUYCART';
const CLEARN_CART = 'CLEARN_CART';
const RECORD_USERINFO = 'RECORD_USERINFO';
const DELETE_USERINFO = 'DELETE_USERINFO';
const RETSET_NAME = 'RETSET_NAME';
const GET_ADDRESS = 'GET_ADDRESS';
const ADD_ADDRESS = 'ADD_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';
const CHOOSE_ADDRESS = 'CHOOSE_ADDRESS';
const ORDER_SUCCESS = 'ORDER_SUCCESS';
export default new Vuex.Store({
	state: {
    	latitude: "", // 纬度
    	longitude: "", // 经度
    	geograph: "31.22299,121.36025", // 地理位置
		cartList: {}, // 加入购物车的商品列表
		userInfo: null, // 用户信息
		login: false, // 是否登录
		allAddressList: [], // 收获地址列表
		choosedAddress: null,//选择地址
		addressIndex: null,//选择地址的索引值
		orderMessage: '', // 下单成功保存返回的信息
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
			if(itemId&&itemId[food_id]){
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
		},
		// 清空购物车
		[CLEARN_CART](state,{shopid}){
			console.log('shopid',shopid)
			let cart = state.cartList;
			cart[shopid] = null;
			console.log('cart',cart);
			state.cartList = {...cart};
			setStore('buyCart',state.cartList);

		},
		// 保存用户信息
		[RECORD_USERINFO](state,userInfo){
			state.userInfo = userInfo;
			setStore('user_id',state.userInfo.user_id);
			this.login = true;
		},
		// 删除用户信息
		[DELETE_USERINFO](state,user_id){
			delStore('user_id');
			state.userInfo = {};
		},
		// 修改用户名
		[RETSET_NAME](state,username){
			state.userInfo = Object.assign({}, state.userInfo,{username})
		},
		// 获取所有的地址
		[GET_ADDRESS](state,address){
			state.allAddressList = address;
		},
		// 添加地址
		[ADD_ADDRESS](state,address){
			state.allAddressList = [...state.allAddressList,address];
		},
		// 删除地址
		[DELETE_ADDRESS](state,addressIndex){
			state.allAddressList.splice(addressIndex,1);
		},
		// 保存选择的地址
		[CHOOSE_ADDRESS](state,{address,index}){
			state.choosedAddress = address;
			state.addressIndex = index;
			console.log("保存的地址:",state.choosedAddress,"保存的 index:",state.addressIndex);
		},
		// 下单成功，保存订单返回信息
		[ORDER_SUCCESS](state, order) {
			state.orderMessage = order;
		},

  	},
  	actions: {},
  	modules: {},
});
