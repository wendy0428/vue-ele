<template>
    <div class="forget">
        <common-head :headData=headData>
            <template>重置密码</template>
            <slot name="head_right">
                <template></template>
            </slot>
        </common-head>
        <section class="login_container">
            <div class="login_account">
                <input type="text" v-model="userName" class="user_name" placeholder="账号" autocomplete="false"/>
            </div>
            <div class="login_password">
                <input type="text" v-model="oldPassword" class="user_password" placeholder="旧密码" autocomplete="false"/>
            </div>
            <div>
                <input type="text" v-model="newPassword" class="user_password" placeholder="请输入新密码" autocomplete="false"/>
            </div>
            <div>
                <input type="text" v-model="confirmPassword" class="user_password" placeholder="请确认密码" autocomplete="false"/>
            </div>
            <div class="login_verification_code">
                <input type="number" v-model="captcha_code" class="user_code" placeholder="验证码" autocomplete="false"/>
                <img :src="captchaCodeImg.code" v-if="captchaCodeImg"/>
                <div>
                    <span @click="changeCaptchaCodeImg">看不清</span>
                    <span @click="changeCaptchaCodeImg">换一张</span>
                </div>
            </div>
        </section>
         <section class="login_btn">
            <span @click="confirmModify">确认修改</span>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {getCaptchas,changePassword} from '../../service/getData'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            userName: '', // 用户名
            oldPassword: '', // 老密码
            newPassword: '', // 新密码
            confirmPassword: '', // 确认密码
            captcha_code: '', // 验证码
            captchaCodeImg: '', // 验证码图片
        }
    },
    created(){
        this.initData();
    },
    methods:{
        async initData(){
            // 获取图形验证码
            this.captchaCodeImg = await getCaptchas();
        },
        // 看不清 和 换一张 的时候,获取新的一张图形验证码
        async changeCaptchaCodeImg(){
            // 获取图形验证码
            this.captchaCodeImg = await getCaptchas();
        },
        confirmModify(){
            if(!this.userName){
                this.$toast({
                    message: '请填写用户名',
                    position: "center",
                    duration: 1000
                });
                return;
            }
            if(!this.oldPassword){
                this.$toast({
                    message: '请填写旧密码',
                    position: "center",
                    duration: 1000
                });
                return;
            }

            if(!this.newPassword){
                this.$toast({
                    message: '请填写新密码',
                    position: "center",
                    duration: 1000
                });
                return;
            }
            if(!this.confirmPassword){
                this.$toast({
                    message: '请填写确认密码',
                    position: "center",
                    duration: 1000
                });
                return;
            }
            if(this.newPassword != this.confirmPassword){
                this.$toast({
                    message: '请保持两次输入密码相同',
                    position: "center",
                    duration: 1000
                });
                return;
            }
            changePassword(this.userName, this.oldPassword, this.newPassword, this.confirmPassword, this.captcha_code).then((res) => {
                if(res.status == 1){
                    this.$toast({
                        message: res.success,
                        position: "center",
                        duration: 1000
                    });
                }else{
                    this.$toast({
                        message: res.message,
                        position: "center",
                        duration: 1000
                    });
                }
            }).catch((err) => {
                this.$toast({
                    message: res.err,
                    position: "center",
                    duration: 1000
                });
            });
        }
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.login_container{
    background-color: #fff;
    margin-top: 90px;
    width: 100%;
}
.login_container>div{
    display: flex;
    margin: 25px 20px;
    border-bottom: 1px solid #f1f1f1;
    padding: 10px 0;
}
.login_container input{
    width: 60%;
    padding: 25px 10px 25px 20px;
    border: 0;
    outline: 0;
    color: #666;
    font-size: 30px;
}
.login_verification_code>img{
    /* width: 100%; */
    display: inline-block;
    vertical-align: middle;
}
.login_verification_code>div{
    width: 15%;
    font-size: 20px;
    margin-left: 5px;
}
.login_verification_code>div>span{
    display: block;
    color: #3b95e9;
    padding-bottom: 10px;
}

.login_verification_code>div>span:nth-child(1){
    color: #666;
}
.login_btn span{
    display: inline-block;
    width: 80%;
    border-radius: 20px;
    background-color: #4cd964;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
}
</style>