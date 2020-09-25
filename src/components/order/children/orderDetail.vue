<template>
    <div class="orderDetail">
        <common-head :headData=headData>
            <template>订单详情</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="orderDetailBox" v-if="order">
            <div class="title">
                <div>
                    <img :src="'http://cangdu.org:8001/img/'+order.restaurant_image_url"/>
                </div>
                <div>
                    <router-link :to="{path:'/shop',query:{geograph,id:order.restaurant_id}}" class="oneMore" tag="span">再来一单</router-link>
                </div>
            </div>
            <!-- 下单信息 -->
            <section class="cart">
                <div class="cart_title">
                    <img :src="'http://cangdu.org:8001/img/'+order.restaurant_image_url"/>
                    <span>效果显示</span>
                </div>
                <!-- 商品 -->
                <ul v-if="order.basket.group[0].length!=0">
                    <li v-for="(food,foodIntex) in order.basket.group[0]" :key="foodIntex">
                        <span>{{food.name}}</span>
                        <span>x{{food.quantity}}</span>
                        <span>¥{{food.price}}</span>
                    </li>
                </ul>
                 <!-- 其他收费 -->
                <ul v-if="order.basket.extra.length!=0">
                    <li v-for="(extra,extraIndex) in order.basket.extra" :key="extraIndex">
                        <span>{{extra.name}}</span>
                        <span>x{{extra.quantity}}</span>
                        <span>¥{{extra.price}}</span>
                    </li>
                </ul>
                <!-- 配送费 -->
                <ul>
                    <li>
                        <span>配送费</span>
                        <span></span>
                        <span>¥{{order.basket.deliver_fee.price||0}}</span>
                    </li>
                </ul>

                <div class="cart_total">
                    <span>订单¥{{order.total_amount}}</span>
                    <span>待支付¥{{order.total_amount}}</span>
                </div>
            </section>
            
            <section class="orderInfo_container" v-if="orderInfo">
                <div>
                    <span>配送信息</span>
                </div>
                <div>
                    <span>送达时间:</span>
                    <span>{{orderInfo.deliver_time}}</span>
                </div>
                <div>
                    <span>送货地址:</span>
                    <span>{{orderInfo.addressDetail}}{{orderInfo.phone}}</span>
                </div>
                <div>
                    <span>配送方式:</span>
                    <span>蜂鸟专送</span>
                </div>
            </section>
            <section class="orderInfo_container" v-if="orderInfo">
                <div>
                    <span>订单信息</span>
                </div>
                <div>
                    <span>订单号:</span>
                    <span>{{order.id}}</span>
                </div>
                <div>
                    <span>支付方式:</span>
                    <span>{{orderInfo.pay_method}}</span>
                </div>
            </section>
        </section>

    </div>
</template>
<script>
import { getStore } from '../../../config/utils'
// 公共头部组件
const commonHead = () => import('@/components/header/head')


import {getOrderDetail} from '../../../service/getData'
export default {
    data(){
        return{
            headData:{
                goBack: true,
            },
            order: null,
            user_id:'',
            geograph:'',
            orderInfo: null,
        }
    },
    created(){
        this.geograph = getStore('latitude') + ',' + getStore('longitude') ;
        this.user_id = getStore('user_id');
        this.order = JSON.parse(this.$route.query.order);
        this.initData();
    },
    methods:{
        async initData(){
            this.orderInfo = await getOrderDetail(this.user_id,this.order.id).then((res) => {
                return res;
            })
        }
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.orderDetail{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 12;
}
.orderDetailBox{
    margin-top: 90px;
}
.title{
    background-color: #fff;
    font-size: 40px;
}
.title>div{
    text-align: center;
    margin: 0 auto;
}
.title img{
    width: 30%;
    border-radius: 50%;
}
.title span{
    font-size: 30px;
    color: #3190e8;
    border: 1px solid #3190e8;   
    border-radius: 10px;
    padding: 5px 10px;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 40px;
}
.cart{
    background-color: #fff;
    margin-top: 20px;
}
.cart_title{
    font-size: 40px;
    border-bottom: 1px solid #ededed;
    text-align: left;
    padding: 20px 40px;
}
.cart_title img{
    width: 60px;
    margin-right: 20px;
    vertical-align: middle;
    color: #333;
}
.cart ul,.cart_total{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    color: #666;
}
.cart ul li{
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
}
.cart ul li span:nth-child(1){
    width: 50%;
    text-align: left;
}
.cart ul li span:nth-child(2){
    width: 30%;
    text-align: center;
    color: #f60;
}
.cart ul li span:nth-child(3){
    width: 20%;
    text-align: center;
}
.cart_total{
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ededed;
}
.cart_total>span:nth-child(2){
    color: #f60;
    font-weight: bold;
}
.orderInfo_container{
    font-size: 30px;
    color: #666;
    background: #fff;
    margin-top: 20px;
}
.orderInfo_container>div{
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
</style>