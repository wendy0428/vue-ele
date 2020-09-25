<template>
    <div class="vipcard">
        <common-head :headData=headData>
            <template>会员权益</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section v-if="userInfo" class="username">
            <span>为账户<span class="name">{{userInfo.username}}</span>购买会员</span>
        </section>
        <section class="privilege">
            <div class="privilege_title">
                <span>会员特权</span>
                <router-link :to="{path:'/vipcard/vipDescription'}" tag="span">会员说明</router-link>
            </div>
            <div class="privilege_desc">
                <div>
                    <img :src="shengqianIcon"/>
                </div>
                <div>
                    <div class="privilege_desc_title">
                        <span>减免配送费</span>
                    </div>
                    <div class="privilege_desc_detail">
                        <span>每月减免30单，每日可减免3单，每单最高减4元</span>
                    </div>
                </div>
            </div>
            <div class="privilege_desc">
                <div>
                    <img :src="youfeiIcon"/>
                </div>
                <div>
                    <div class="privilege_desc_title">
                        <span>减免配送费</span>
                    </div>
                    <div class="privilege_desc_detail">
                        <span>每月减免30单，每日可减免3单，每单最高减4元</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="member">
            <div class="member_title">
                <span>开通会员</span>
            </div>
            <div class="member_desc">
                <div>
                    <span>1个月</span><span class="price">¥20</span>
                </div>
                <div>
                    <router-link :to="{path:'/confirmOrder/payment'}" tag="span">购买</router-link>
                </div>
            </div>
        </section>
        <section class="privilege">
            <div class="privilege_title">
                <span>兑换会员</span>
                <span>使用卡号卡密</span>
            </div>
        </section>
        <section class="privilege">
            <div class="privilege_title">
                <span>购买记录</span>
                <span>开发票</span>
            </div>
        </section>
        <!-- 会员说明 -->
        <router-view></router-view>
    </div>
</template>
<script>

// 公共头部组件
const commonHead = () => import('@/components/header/head')

import youfeiIcon from '../../assets/img/youfei.png'
import shengqianIcon from '../../assets/img/sheng.png'
import {getStore} from '../../config/utils'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            youfeiIcon,
            shengqianIcon,
        }
    },
    created(){
        this.user_id = getStore('user_id');
    },
    computed:{
        ...mapState(['userInfo']),
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.vipcard{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
}
.username{
    margin-top: 90px;
    font-size: 30px;
    color: #666;
    padding: 20px;
}

.username span.name{
    color: #333;
    font-weight: bold;
    padding: 10px;
}
.privilege,.member{
    background-color: #fff;
    color: #999;
    margin-top: 20px;
}
.privilege>div:nth-child(1){
    padding: 20px 60px 20px 20px;
    border-bottom: 1px solid #ededee;
}
.privilege_title{
    font-size: 35px;
    display: flex;
    justify-content: space-between;
}
.privilege_title>span:nth-child(1){
    color: #333;
}
.privilege_title>span:nth-child(2){
    color: #666;
}
.privilege_desc{
    display: flex;
}
.privilege_desc>div{
    padding: 20px;
}
.privilege_desc>div:nth-child(1){
    width: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ededee;
}
.privilege_desc>div:nth-child(1) img{
    width: 100px;
}
.privilege_desc>div:nth-child(2){
    font-size: 35px;
    text-align: left;
    color: #333;
}
.privilege_desc>div:nth-child(2) .privilege_desc_detail{
    font-size: 30px;
    color: #999;
}
.member{
    margin-top: 20px;
    padding: 20px 60px 20px 20px;
}

.member_title{
    font-size: 35px;
    color: #333;
    display: flex;
    justify-content: space-between;   
    border-bottom: 1px solid #ededee;
}
.member_desc{
    display: flex;
    justify-content: space-between;   
    font-size: 35px;
    color: #999;
    padding: 50px 10px;
}
.member_desc .price{
    color: #f60;
    font-weight: bold;
    margin-left: 20px;
}
.member_desc>div:nth-child(2){
    border: 1px solid #f60;
    color: #f60;
    font-size: 30px;
    border-radius: 10px;
    padding: 5px 10px;
}
.privilege_title>span:nth-child(2){
    position: relative;
}
.privilege_title>span:nth-child(2)::after{
     content: '';
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url('../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: -50px;
    top: -7px;
}
</style>