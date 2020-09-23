<template>
    <div id="head">
        <div class="head_left">
            <slot name="ele" v-if="headData.showEle">
                <router-link :to="{path:'/'}" tag="span">ele.me</router-link>
            </slot>
            <slot name="search" v-if="headData.showSearchIco">
                <img :src="searchIco"/>
            </slot>
            <slot name="goBack" v-if="headData.goBack">
                <img :src="leftArrowIcon" @click="goBackPage"/>
            </slot>
        </div>
        <div class="head_mid">
            <slot></slot>
        </div>
        <div class="head_right">
            <slot name="head_right">
                <router-link :to="{path: '/profile'}" tag="span" v-if="user_id!='undefined'">
                    <img :src="user_ico"/>
                </router-link>
                <router-link :to="{path:'/login'}" tag="span" v-else>登录/注册</router-link>
               
            </slot>
        </div>
    </div>
</template>
<script>
import leftArrowIcon from '../../assets/img/left_arrow.png'
import searchIco from '../../assets/img/search.png'
import user_ico from '../../assets/img/user.png'
import {getUser} from '../../service/getData'
import {getStore} from '../../config/utils'
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            user_id: null, // 用户 id
            user_ico,
            leftArrowIcon,
            searchIco,
        }
    },
    props:{
        headData: Object
    },
    created(){
        this.initData();
    },
    methods:{
        ...mapMutations(['RECORD_USERINFO']),
        async initData(){
            let userInfo = await getUser(this.user_id).then((res) => {
                if(res['user_id']){
                    return res;
                }else{
                    return {};
                }
            });
            this.RECORD_USERINFO(userInfo);
            this.user_id = getStore("user_id");
        },
        // 返回上一页
        goBackPage(){
            this.$router.go(-1);
        },
    }
}
</script>
<style scoped>
#head {
    background-color: #3190e8;
    height: 90px;
    width: 100%;
    color: #fff;
    font-size: 35px;
    display: flex;
    line-height: 90px;
    position: fixed;
    top:0;
    z-index: 10;
}

#head img{
    width: 50px;
    position: absolute;
    top: 20px;
}
.head_left img{
    left: 20px;
}
.head_right img{
    right: 20px;
}
.head_left,.head_right{
    width: 30%;
    position: relative;
}
.head_left span{
    width: 100%;
    position: absolute;
    left: 5px;
}
.head_right span{
    width: 100%;
    position: absolute;
    right: 5px;
}
.head_mid{
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>