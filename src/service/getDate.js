import { getStore,setStore,removeStore } from './mUtils';
import {httpGet} from './getHttp'

// 获取首页热门城市
export const cityGuess = () => httpGet({url:'/v1/cities',params:{type: 'guess'}})

// 获取用户信息
export const getUser = () => httpGet({url:'/v1/user',params:{user_id: getStore('user_id')}})







