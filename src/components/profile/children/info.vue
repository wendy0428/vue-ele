<template>
    <div class="info">
        <common-head :headData=headData>
            <template>账户信息</template>
            <slot name="head_right">
                <template></template>
            </slot>
        </common-head>
        <section class="count_info" v-if="userInfo">
            <div class="info_avatar">
                <span>头像</span>
                <span>
                    <img :src="'http://cangdu.org:8001/img/'+userInfo.avatar"/>
                </span>
                <input type="file" class="inputAvatar" @change="upLoadAvator"/>
            </div>
            <div class="info_name">
                <span>用户名</span>
                <span>{{userInfo.username}}</span>
            </div>
            <div class="info_address">
                <span>收货地址</span>
            </div>
        </section>
        <section class="login_btn">
            <span @click="loginOut">退出登录</span>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {signout,uploadAvatar} from '../../../service/getData'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            headData:{
                goBack: true,
            },
        }
    },
    methods:{
        ...mapMutations(['DELETE_USERINFO']),
        loginOut(){
            this.DELETE_USERINFO(userInfo.user_id);
            signout();
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
        }
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
.info{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 11;
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
.count_info{
    margin-top: 90px;
    font-size: 30px;
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
</style>