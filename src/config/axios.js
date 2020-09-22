import { baseUrl } from './env'
import { getStore,setStore } from './utils'
import store from '../store'
import axios from 'axios' 


// axios很好用，其中之一就是它的拦截器十分强大，我们就可以为请求和响应设置拦截器
// 请求拦截器可以在每个请求里加上token，做了统一处理后维护起来也方便，
// 响应拦截器可以在接收到响应后先做一层操作，如根据状态码判断登录状态、授权。
// request 拦截器实现
// axios.interceptors.request.use(
// 	config => {
// 		config.baseURL = baseUrl;
// 		// 设置超时时间和请求头信息
// 	 	config.withCredentials = true ;// 允许携带token ,这个是解决跨域产生的相关问题
// 		config.timeout = 6000;
// 		// 每次发送请求之前判断是否存在token
//     	// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
// 	 	let token = getStore('access_token')
// 	 	if (token) {
// 			config.headers = {
// 	   			'access-token': token,
// 	   			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// 	  		}
// 	 	}
// 	 	if (config.url === 'refresh') {
// 	  		config.headers = {
// 	   			'refresh-token': getStore('refresh_token'),
// 	   			'Content-Type': 'application/x-www-form-urlencoded'
// 	  		}
// 	 	}
// 	 	return config
// 	},
// 	error => {
// 	 	return Promise.reject(error)
// 	}
// )

// response 拦截器实现
// axios.interceptors.response.use(
// 	response => {
// 	 	// 定时刷新access-token
// 	 	// if (!response.data.data && response.data.data.message === 'token invalid') {
// 	  	// 	// 刷新token
// 	  	// 	store.dispatch('refresh').then(response => {
// 		// 		setStore('access_token', response.data)
// 	  	// 	}).catch(error => {
// 	   	// 		throw new Error('token刷新' + error)
// 	  	// 	})
// 		// };
// 		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//   		// 否则的话抛出错误
// 		if (response.status === 200) {
// 			if (response.data.code === 511) {
// 				// 未授权调取授权接口
// 			} else if (response.data.code === 510) {
// 			  	// 未登录跳转登录页
// 			} else {
// 			  	return Promise.resolve(response)
// 			}
// 		} else {
// 			return Promise.reject(response)
// 		}
// 	 	return response
// 	},
// 	error => {
// 	 	// 我们可以在这里对异常状态作统一处理
//   		if (error.response.status) {
//     		// 处理请求失败的情况
//     		// 对不同返回码对相应处理
//     		return Promise.reject(error.response)
//   		}
// 	}
// )


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

  //post 发送 formData 请求
export function httpFormDataPost({
	url,
	data = {},
}){
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
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}

	  	}).then(res => {
			resolve(res.data)
	  	})
	})
}
  