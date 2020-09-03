<template>
    <div id="head">
        <div class="head_left">
            <router-link :to="{}" v-if="userInfo" tag="div">ele.me</router-link>
            <router-link :to="{}" v-else>
                <img :src="search_ico"/>
            </router-link>
        </div>
        <div class="head_mid">
            <slot>111</slot>
        </div>
        <div class="head_right">
            <router-link :to="{}" v-if="userInfo">
                <img :src="user_ico"/>
            </router-link>
            <router-link :to="{}" v-else tag="div">登录/注册</router-link>
        </div>
    </div>
</template>
<script>
import search_ico from '../../assets/search.png'
import user_ico from '../../assets/user.png'
import {getUser} from '../../service/getDate'
export default {
    data(){
        return {
            userInfo: true,
            search_ico,
            user_ico,
        }
    },
    created(){
        getUser();
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
    width: 20%;
    /* background-color:red; */
    position: relative;
}
.head_mid{
    width: 60%;
    /* background-color: yellow; */
}
</style>