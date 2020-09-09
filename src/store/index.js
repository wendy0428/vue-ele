import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// ES6中,用字面量定义对象时,用表达式作为对象的属性名,把表达式放在方括号内
const RECORD_ADDRESS = "RECORD_ADDRESS"
const SAVE_GEOHASH = "SAVE_GEOHASH"
export default new Vuex.Store({
  state: {
    latitude: "", // 纬度
	longitude: "", // 经度
	geograph: '31.22299,121.36025', // 地理位置
	
  },
  mutations: {
	// 保存地理位置
    [RECORD_ADDRESS](state, { longitude, latitude }) {
    	state.longitude = longitude;
		state.latitude = latitude;
	},
	// 保存地理位置
	[SAVE_GEOHASH](state,{geograph}){
		state.geograph = geograph;
	}
  },
  actions: {},
  modules: {},
});
