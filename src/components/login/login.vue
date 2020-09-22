<template>
    <div class="login">
        <common-head :headData=headData>
            <template>密码登录</template>
            <slot name="head_right">
                <template></template>
            </slot>
        </common-head>
        <section class="login_container">
            <div class="login_account">
                <input type="text" v-model="userName" class="user_name" placeholder="账号" autocomplete="false"/>
            </div>
            <div class="login_password">
                <input type="text" v-model="password" class="user_password" placeholder="密码" autocomplete="false" v-if="isProclaimed"/>
                <input type="password" v-model="password" class="user_password" placeholder="密码" autocomplete="false" v-else/>
                <div class="notice_box">
                    <span class="notice" :class="isProclaimed?'add_bg':''" >abc...</span>
                    <span class="translate" @click="proclaimedPassword" :class="isProclaimed?'add_transform':''"></span>
                </div>
            </div>
            <div class="login_verification_code">
                <input type="number" v-model="code" class="user_code" placeholder="验证码" autocomplete="false"/>
                <img :src="captchaCodeImg.code" v-if="captchaCodeImg"/>
                <div>
                    <span @click="changeCaptchaCodeImg">看不清</span>
                    <span @click="changeCaptchaCodeImg">换一张</span>
                </div>
            </div>
        </section>
        <section class="reminder">
            <p>温馨提示:未注册过的账号,登录时将自动注册</p>
            <p>注册过的用户可凭账号密码登录</p>
        </section>

        <section class="login_btn">
            <span @click="loginIn">登录</span>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {getCaptchas,accountLogin} from '../../service/getData'
import {mapState,mapMutations} from 'vuex'
export default{
    data(){
        return {
            headData:{
                goBack: true,
                // hideLogin: false,
            },
            userName: '', // 用户名
            password: '', // 密码
            code: '', // 验证码
            captchaCodeImg: null, // 验证码图片
            isProclaimed: false, // 是否明文显示密码
            userInfo: null,
        }
    },
    created(){
        this.initData();
    },
    methods:{
        ...mapMutations(['RECORD_USERINFO']),
        async initData(){
            // 获取图形验证码
            this.captchaCodeImg = await getCaptchas();
        },
        // 控制是否明文显示密码
        proclaimedPassword(){
            this.isProclaimed = !this.isProclaimed;
        },
        // 看不清 和 换一张 的时候,获取新的一张图形验证码
        async changeCaptchaCodeImg(){
            // 获取图形验证码
            this.captchaCodeImg = await getCaptchas();
        },
        loginIn(){
            // 用户名不能为空
            if(!this.userName){
                this.$toast({
                    message: '请填写用户名',
                    position: "center",
                    duration: 1000
                });
                return;
            };
            // 密码不能为空
            if(!this.password){
                this.$toast({
                    message: '请填写密码',
                    position: "center",
                    duration: 1000
                });
                return;
            };
            if(!this.code){
                this.$toast({
                    message: '请填写验证码',
                    position: "center",
                    duration: 1000
                });
                return;
            }
            accountLogin(this.userName,this.password,this.code).then((res) => {
                // this.userInfo = res;
                this.RECORD_USERINFO(res);
                this.$router.push({path:'/profile'});
            }).catch((err) => {
                this.$toast({
                    message: err,
                    position: "center",
                    duration: 1000
                });
                this.changeCaptchaCodeImg();
            })
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
.login_password{
    justify-content: space-between;
}
.notice{
    display: inline-block;
    background-color: #ccc;
    color: #fff;
    border-radius: 10px;
    font-size: 20px;
    padding: 0px 20px;
}
.notice_box{
    position: relative;
}
.translate{
    position: absolute;
    top: 35px;
    left: -20px;
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f1f1f1;
}
.add_bg{
    background-color: #4cd964 !important;
}
.add_transform{
    transform: translate(100%);
}
.reminder{
    font-size: 30px;
    color: #ff0000;
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