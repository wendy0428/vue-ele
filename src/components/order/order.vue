<template>
    <div class="order">
        <common-head :headData=headData>
            <template>订单列表</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="order_list" v-if="orderList.length!=0">
            <ul>
                <li v-for="(order,orderIndex) in orderList" :key="orderIndex">
                    <router-link :to="{path:'/order/orderDetail',query:{order:JSON.stringify(order)}}" tag="div">
                        <div class="order_left">
                            <img :src="'http://cangdu.org:8001/img/'+order.restaurant_image_url"/>
                        </div>
                        <div class="order_right">
                            <div class="order_right_top">
                                <span>{{order.restaurant_name}}</span>
                                <span>支付超时</span>
                            </div>
                            <div class="order_right_middle">
                                <span>{{order.formatted_created_at}}</span>
                            </div>
                            <div class="order_right_bottom">
                                <span class="total_quantity">{{order.basket.group[0][0].name}}{{order.basket.group[0].length>1?'等'+order.total_quantity+'件商品':''}}</span>
                                <span class="total_amount">¥{{order.total_amount}}</span>
                            </div>
                        </div>
                    </router-link>
                    <div>
                        <router-link :to="{path:'/shop',query:{geograph,id:order.restaurant_id}}" class="oneMore" tag="span">再来一单</router-link>
                    </div>
                </li>
            </ul>
        </section>
        <!-- 公共的底部 Tabber 组件 -->
        <tabbar :selectedTab="selectedTab"></tabbar>
        <router-view></router-view>
    </div>
</template>
<script>
import { getStore } from '../../config/utils'
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const tabbar = () => import('@/components/common/tabbar')

import {getOrderList} from '../../service/getData'
export default {
    data(){
        return{
            headData:{
                goBack: true,
            },
            orderList: [], // 订单列表
            offset: 10,
            selectedTab:'订单',
            geograph:'',
        }
    },
    created(){
        this.geograph = getStore('latitude') + ',' + getStore('longitude') ;
        this.initData();
    },
    methods:{
        async initData(){
            this.orderList = await getOrderList(getStore('user_id'),this.offset).then((res)=>{
                return res;
            })
        }
    },
    components:{
        commonHead,
        tabbar
    }
}
</script>
<style scoped>
.order{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
}
.order_list{
    margin-top: 90px;
}
.order_list ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.order_list ul li{
    /* font-size: 30px; */
    background: #fff;
}
.order_list ul li>div:nth-child(1){
    display: flex;
}
.order_list ul li>div:nth-child(2){
    text-align: right;
}
.order_left{
    width: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.order_left img{
    width: 80%;
}
.order_right{
    width: 75%;
    text-align: right;

}
.order_right>div{
    padding: 5px 20px;
}
.order_right_top{
    color:  #333;
    font-size: 35px;
    display: flex;
    justify-content: space-between;
}
.order_right_middle{
    font-size: 30px;
    color: #999;
    text-align: left;
}
.order_right_bottom{
    display: flex;
    justify-content: space-between;
}
.order_right_bottom{
    font-size: 35px;
    color: #666;
}
.total_amount{
    color: #f60;
    font-weight: bold;
}

.oneMore{
    font-size: 30px;
    color: #3190e8;
    border: 1px solid #3190e8;   
    margin-right: 20px;
    border-radius: 10px;
}
</style>