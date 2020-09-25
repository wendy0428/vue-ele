<template>
    <div class="profile">
        <common-head :headData=headData>
            <template>我的</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section v-if="userInfo">
            <section class="profile_detail">
                <div class="profile_detail_left">
                    <img :src="user_id!='undefined'?'http://cangdu.org:8001/img/'+userInfo.avatar:'http://elm.cangdu.org/img/default.jpg'"/>
                </div>
                <div class="profile_detail_right">
                    <div class="profile_detail_right_top">
                        <router-link :to="{path:'/profile/info'}" tag='span' v-if="user_id!='undefined'">{{userInfo.username}}</router-link>
                        <router-link :to="{path:'/login'}" tag='span' v-else>登录/注册</router-link>
                    </div>
                    <div class="profile_detail_right_bottom">
                        <span>暂无绑定手机号</span>
                    </div>
                </div>
            </section>
            <section class="profile_data">
                <ul>
                    <router-link :to="{path:'/balance'}" tag="li">
                        <div class="profile_data_num">
                            <span v-if="user_id!='undefined'">{{userInfo.balance.toFixed(2)}}</span>
                            <span v-else>0.00</span>
                            <span>元</span>
                        </div>
                        <div class="profile_data_title">
                            <span>我的余额</span>
                        </div>
                    </router-link>
                    <li>
                        <div class="profile_data_num">
                            <span v-if="user_id!='undefined'">{{userInfo.gift_amount}}</span>
                            <span v-else>0</span>
                            <span>元</span>
                        </div>
                        <div class="profile_data_title">
                            <span>我的优惠</span>
                        </div>
                    </li>
                    <router-link :to="{path:'/points'}" tag="li">
                        <div class="profile_data_num">
                            <span v-if="user_id!='undefined'">{{userInfo.point}}</span>
                            <span v-else>0</span>
                            <span>元</span>
                        </div>
                        <div class="profile_data_title">
                            <span>我的积分</span>
                        </div>
                    </router-link>
                </ul>
            </section>
            <section class="profie_options">
                <ul>
                    <router-link :to="{path: '/order'}" tag="li">
                        <span>
                            <img :src="orderIcon"/>
                        </span>
                        <span>我的订单</span>
                    </router-link>
                    <li>
                        <span>
                            <img :src="pointIcon"/>
                        </span>
                        <span>积分商城</span>
                    </li>
                    <router-link :to="{path: '/vipcard'}" tag="li">
                        <span>
                            <img :src="queenIcon"/>
                        </span>
                        <span>饿了么会员卡</span>
                    </router-link>
                    
                </ul>
            </section>
            <section class="profie_options">
                <ul>
                    <router-link :to="{path:'/service'}" tag="li">
                        <span>
                            <img :src="serviewIcon"/>
                        </span>
                        <span>服务中心</span>
                    </router-link>
                    <li>
                        <span>
                            <img :src="eleIcon"/>
                        </span>
                        <span>下载饿了么APP</span>
                    </li>
                </ul>
            </section>
        </section>
        <!-- 公共的底部 Tabber 组件 -->
        <tabbar :selectedTab="selectedTab"></tabbar>
        <!-- 账户信息 info -->
        <router-view></router-view>
    </div>
</template>
<script>
import orderIcon from '../../assets/img/order.png'
import pointIcon from '../../assets/img/point.png'
import queenIcon from '../../assets/img/queen.png'
import serviewIcon from '../../assets/img/serview.png'
import eleIcon from '../../assets/img/logo.png'
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const tabbar = () => import('@/components/footer/footGuide')


import {getStore} from '../../config/utils'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            orderIcon,
            pointIcon,
            queenIcon,
            serviewIcon,
            eleIcon,
            user_id: null,
            selectedTab:'我的',
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
        tabbar,
    }
}
</script>
<style scoped>
.profile_detail{
    background-color: #3190e8;
    color: #fff;
    font-size: 35px;
    margin-top: 90px;
    display: flex;
    box-sizing: border-box;
    padding: 30px 10px;
}
.profile_detail_left{
    width: 20%;
}
.profile_detail_left img{
    width: 80%;
    border-radius: 50%;
}
.profile_detail_right{
    width: 80%;
    text-align: left;
    padding-left: 10px;
    position: relative;
}
.profile_detail_right::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: 50%;
}
.profile_detail_right>div{
    margin-top: 10px;

}
.profile_detail_right_top{
    font-weight: bold;
    text-align: left;
}
.profile_detail_right_bottom{
    font-size: 30px;
}
.profile_detail_right_bottom>span::before{
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('../../assets/img/phone.png') no-repeat;
    background-size: contain;
    position: relative;
    top: 10px;
}

/*  */
.profile_data>ul{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}
.profile_data>ul>li{
    width: 33%;
    font-size: 25px;
    color: #666;
    padding: 50px;
}
.profile_data>ul>li>div{
    margin-bottom: 10px;
}
.profile_data>ul>li:nth-child(1) .profile_data_num span:nth-child(1){
    color: #f90;
    font-weight: bold;
    font-size: 50px;
    padding-right: 10px;
}
.profile_data>ul>li:nth-child(2){
    border-left: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
}
.profile_data>ul>li:nth-child(2) .profile_data_num span:nth-child(1){
    color: #ff5f3e;
    font-weight: bold;
    font-size: 50px;
    padding-right: 10px;
}
.profile_data>ul>li:nth-child(3) .profile_data_num span:nth-child(1){
    color: #6ac20b;
    font-weight: bold;
    font-size:50px;
    padding-right: 10px;
}

.profie_options>ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 35px;
    color: #333;
    background-color: #fff;
    margin-top: 20px;
}
.profie_options>ul>li{
    display: flex;
    justify-content: space-around;
}
.profie_options>ul>li>span:nth-child(1){
    display: inline-block;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.profie_options>ul>li>span:nth-child(1) img{
    display: inline-block;
    width: 50%;
    vertical-align: middle;
}
.profie_options>ul>li>span:nth-child(2){
    display: inline-block;
    width: 90%;
    padding: 30px 0;
    box-sizing: border-box;
    border-bottom: 2px solid #f1f1f1;
    text-align: left;
    position: relative;
}
.profie_options>ul>li>span:nth-child(2)::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: 40%;
}
</style>