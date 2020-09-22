<template>
    <div class="profile">
        <common-head :headData=headData>
            <template>我的</template>
            <slot name="head_right">
                <template></template>
            </slot>
        </common-head>
        <section class="profile_detail">
            <div class="profile_detail_left">
                <img :src="'http://elm.cangdu.org/img/default.jpg'"/>
            </div>
            <div class="profile_detail_right">
                <div>
                    <div>
                        <span v-if="user_id!='undefined'">{{userInfo.username}}</span>
                        <span v-else>登录/注册</span>
                    </div>
                    <div>暂无绑定手机号</div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {getStore} from '../../config/utils'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            user_id: null,
        }
    },
    created(){
        this.user_id = getStore('user_id');
        // console.log('userInfo',this.userInfo);
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
}
</style>