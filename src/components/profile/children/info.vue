<template>
    <div class="info">
        <common-head :headData=headData>
            <template>账户信息</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="count_info" v-if="userInfo">
            <div class="info_avatar">
                <span>头像</span>
                <span>
                    <img :src="'http://cangdu.org:8001/img/'+userInfo.avatar"/>
                </span>
                <input type="file" class="inputAvatar" @change="upLoadAvator"/>
            </div>
            <router-link :to="{path:'/profile/info/setUserName'}" tag="div" class="info_name">
                <span>用户名</span>
                <span>{{userInfo.username}}</span>
            </router-link>
            <router-link :to="{path:'/profile/info/address'}" tag="div" class="info_address">
                <span>收货地址</span>
            </router-link>
        </section>
        <section class="account_binding">
            <div>
                <span>绑定账号</span>
            </div>
            <div @click="changePhone">
                <span>手机</span>
            </div>
        </section>
        <section class="security_setting">
            <div>
                <span>安全设置</span>
            </div>
            <router-link :to="{path:'/forget'}" tag="div">
                <span>登录密码</span>
            </router-link >
        </section>
        <section class="login_btn">
            <span @click="loginOut">退出登录</span>
        </section>
        <!-- 弹窗组件 -->
        <alert-tip :alertText="alertText" v-if="alertStatus" @closeAlertTip="closeAlertTip"></alert-tip>
        <!-- 修改用户名&&编辑地址 -->
        <router-view></router-view>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const alertTip = () => import('@/components/common/alertTip')

import {signout,uploadAvatar} from '../../../service/getData'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            headData:{
                goBack: true,
            },
            alertStatus:false,
            alertText: '',
        }
    },
    methods:{
        ...mapMutations(['DELETE_USERINFO']),
        // 退出登录
        loginOut(){
            this.DELETE_USERINFO(this.userInfo.user_id);
            signout();
            this.$router.push({path:'/profile'});
        },
        // 上传头像
        async upLoadAvator(){
            if (this.userInfo) {
                let input = document.querySelector('.inputAvatar')
                let data = new FormData();
                data.append('file', input.files[0]);
                console.log('data',data);
                try{
                    let response = await uploadAvatar(this.userInfo.user_id,data)
                    if(response.status == 1) {
                        this.userInfo.avatar = response.image_path;
                    }
                }catch (error) {
                    this.$toast({
                        message: error,
                        position: 'center',
                        duration: 1000
                    })
                }
            }
        },
        // 绑定手机
        changePhone(){
            this.alertText = '请在手机 APP 中设置';
            this.alertStatus = true;
        },
        // 关闭弹窗
        closeAlertTip(){
            this.alertStatus = false;
        }
    },
    computed:{
        ...mapState(['userInfo']),
    },
    components:{
        commonHead,
        alertTip
    }
}
</script>
<style scoped>
.info{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
}
.login_btn{
    margin-top: 20px;
}
.login_btn span{
    display: inline-block;
    width: 80%;
    border-radius: 20px;
    background-color: #d8584a;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
}
.count_info{
    margin-top: 90px;
    font-size: 30px;
    background-color: #fff;
    color: #333;
    font-weight: bold;
}
.count_info>div{
    display: flex;
    padding: 40px 50px 40px 30px;
    border-bottom: 2px solid #f1f1f1;
}
.info_avatar{
    height: 60px;
    line-height: 60px;
}
.info_avatar>span:nth-child(1),.info_name>span:nth-child(1) {
    display: inline-block;
    width: 70%;
    text-align: left;
}
.info_avatar>span:nth-child(2),.info_name>span:nth-child(2){
    width: 30%;

}
.info_avatar>span:nth-child(2) img{
    width: 40%;
    border-radius: 50%;
}
.info_avatar,.info_name{
    position: relative;

}
.info_avatar::after{
    content: '';
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url('../../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: 40px;
}
.info_name::after,.info_address::after{
    content: '';
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url('../../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: 25%;
}
.inputAvatar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    opacity: 0;
}

.account_binding,.security_setting{
    font-size: 30px;
    text-align: left;
}
.account_binding>div,.security_setting>div{
    padding: 20px;
}
.security_setting>div:nth-child(2){
    background-color: #fff;
    position: relative;
}
.account_binding>div:nth-child(2){
    background-color: #fff;
    padding-left: 70px;
    position: relative;

}
.account_binding>div:nth-child(2)>span,.security_setting>div:nth-child(2)>span{
    position: relative;
}
.account_binding>div:nth-child(2)>span::before{
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('../../../assets/img/mobile.png') no-repeat;
    background-size: contain;
    position: absolute;
    left: -50px;
    top: 0%;
}
.account_binding>div:nth-child(2)::after,.security_setting>div:nth-child(2)::after{
    content: '';
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url('../../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 0px;
    top: 20%;
}
</style>