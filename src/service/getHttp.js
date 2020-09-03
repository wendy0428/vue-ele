import { baseUrl } from './env'
import { getStore,setStore } from './mUtils'
import store from '../store'
import axios from 'axios' 
// request 拦截器实现
axios.interceptors.request.use(
	config => {
		config.baseURL = baseUrl;
	 	config.withCredentials = true ;// 允许携带token ,这个是解决跨域产生的相关问题
		config.timeout = 6000;
	 	let token = getStore('access_token')
	 	if (token) {
			config.headers = {
	   			'access-token': token,
	   			'Content-Type': 'application/x-www-form-urlencoded'
	  		}
	 	}
	 	if (config.url === 'refresh') {
	  		config.headers = {
	   			'refresh-token': getStore('refresh_token'),
	   			'Content-Type': 'application/x-www-form-urlencoded'
	  		}
	 	}
	 	return config
	},
	error => {
	 	return Promise.reject(error)
	}
)

// response 拦截器实现
axios.interceptors.response.use(
	response => {
	 	// 定时刷新access-token
	 	if (!response.data && response.data.data.message === 'token invalid') {
	  		// 刷新token
	  		store.dispatch('refresh').then(response => {
				setStore('access_token', response.data)
	  		}).catch(error => {
	   			throw new Error('token刷新' + error)
	  		})
	 	}
	 	return response
	},
	error => {
	 	return Promise.reject(error)
	}
)


// get 请求
export function httpGet({
	url,
	params = {},
	type = 'GET'
}){
	return new Promise((resolve, reject) => {
		axios({
			url,
			type,
			params,
		}).then((res) => {
			resolve(res.data)
	  	}).catch(err => {
			reject(err)
	  	})
	})
}
// post 请求
export function httpPost({
	url,
	data = {},
	params = {}
  }) {
	return new Promise((resolve, reject) => {
		axios({
			url,
			method: 'POST',
			// post请求提交前需要对它进行序列号操作，这里是通过transformRequest做处理
			transformRequest: [function (data) {
				let ret = ''
			  	for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			  	}
			  	return ret
			}],
			// 发送的数据
			data,
			// url参数
			params
	  	}).then(res => {
			resolve(res.data)
	  	})
	})
  }
  