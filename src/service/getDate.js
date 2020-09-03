import { getStore,setStore,removeStore } from './mUtils';
import {httpGet,httpPost} from './axios'


// 1. 获取 用户信息
export const getUser = () => httpGet({url: '/v1/user',params: {user_id: getStore('user_id')}})


// 2. 获取 猜想的城市
export const cityGuess = () => httpGet({url: '/v1/cities',params: {type: 'guess'}})

// 3.获取 热门城市列表
export const hotcity = () => httpGet({url:'/v1/cities',params: {type: 'hot'}})

// 4. 获取所有城市
export const groupcity = () => httpGet({url: '/v1/cities',params: {type: 'group'}})








