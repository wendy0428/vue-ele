<template>
    <div class="service">
        <common-head :headData=headData>
            <template>服务中心</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="service_title">
            <router-link :to="{}" tag="div">
                <img :src="serviceIco"/>
                <span>在线客服</span>
            </router-link>
            <router-link :to="{}" tag="div">
                <img :src="telIco"/>
                <span>在线客服</span>
            </router-link>
        </section>
        <section class="hot_questions">
            <div>热门问题</div>
            <ul>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.supervipContent}}" tag="li"  v-if="explain.supervipCaption">
                    <span>{{explain.supervipCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.signContent}}" tag="li"  v-if="explain.signContent">
                    <span>{{explain.signCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.rankContent}}" tag="li"  v-if="explain.rankContent">
                    <span>{{explain.rankCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.pointtextContent}}" tag="li"  v-if="explain.pointtextContent">
                    <span>{{explain.pointtextCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.phototutorialContent}}" tag="li"  v-if="explain.phototutorialContent">
                    <span>{{explain.phototutorialCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.paymentContent}}" tag="li"  v-if="explain.paymentContent">
                    <span>{{explain.paymentCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.otherContent}}" tag="li"  v-if="explain.otherContent">
                    <span>{{explain.otherCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.ontimeContent}}" tag="li"  v-if="explain.ontimeContent">
                    <span>{{explain.ontimeCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.memberPartCutContent}}" tag="li"  v-if="explain.memberPartCutContent">
                    <span>{{explain.memberPartCutCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.memberContent}}" tag="li"  v-if="explain.memberContent">
                    <span>{{explain.memberCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.hongbaoContent}}" tag="li"  v-if="explain.hongbaoContent">
                    <span>{{explain.hongbaoCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.freshmanContent}}" tag="li"  v-if="explain.freshmanContent">
                    <span>{{explain.freshmanCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.forgotContent}}" tag="li"  v-if="explain.forgotContent">
                    <span>{{explain.forgotCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.discountContent}}" tag="li"  v-if="explain.discountContent">
                    <span>{{explain.discountCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.disclaimerContent}}" tag="li"  v-if="explain.disclaimerContent">
                    <span>{{explain.disclaimerCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.couponContent}}" tag="li"  v-if="explain.couponContent">
                    <span>{{explain.couponCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.businessContent}}" tag="li"  v-if="explain.businessContent">
                    <span>{{explain.businessCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.balanceCaption}}" tag="li"  v-if="explain.balanceCaption">
                    <span>{{explain.balanceCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.awesomeRestaurantContent}}" tag="li"  v-if="explain.awesomeRestaurantContent">
                    <span>{{explain.awesomeRestaurantCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.anonymousBuyCaption}}" tag="li"  v-if="explain.anonymousBuyCaption">
                    <span>{{explain.anonymousBuyCaption}}</span>
                </router-link>
                <router-link :to="{path:'/service/questionDetail',query:{des:explain.activityCaption}}" tag="li"  v-if="explain.activityCaption">
                    <span>{{explain.activityCaption}}</span>
                </router-link>
            </ul>
        </section>
        <!-- 问题详情 -->
        <router-view></router-view>
    </div>
</template>
<script>
import { getStore } from '../../config/utils'
// 公共头部组件
const commonHead = () => import('@/components/header/head')

import {getService} from '../../service/getData'

import serviceIco from '../../assets/img/service.png'
import telIco from '../../assets/img/tel.png'
export default {
    data(){
        return{
            headData:{
                goBack: true,
            },
            serviceIco,
            telIco,
            explain: {},
        }
    },
    created(){
        this.initData();
    },
    methods:{
        async initData(){
            this.explain = await getService().then((res)=>{
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
.service{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
    overflow: auto;
}
.service_title{
    display: flex;
    margin-top: 90px;
    background: #fff;
    border-bottom: 1px solid #ededed;
}
.service_title>div{
    width: 50%;
    text-align: center;
    padding-bottom: 20px;

}
.service_title>div:nth-child(1){
    border-right: 1px solid #ededed;
}
.service_title>div>img{
    width: 13%;
    display: inline-block;
}
.service_title>div>span{
    display: block;
    font-size: 20px;
    color: #666;
}
.hot_questions{
    background-color: #fff;
}
.hot_questions>div{
    color: #333;
    font-size: 35px;
    text-align: left;
    padding: 20px ;
}
.hot_questions ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    color: #666;
    text-align: left;
}
.hot_questions ul li{
    padding: 30px;
    border-top: 1px solid #ededed;
    position: relative;
}
.hot_questions ul li::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: 30%;
}
</style>