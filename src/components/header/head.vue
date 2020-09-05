<template>
    <div id="head">
        <div class="head_left">
            <slot name="ele"></slot>
            <slot name="search"></slot>
            <slot name="goBack"></slot>
        </div>
        <div class="head_mid">
            <slot>111</slot>
        </div>
        <div class="head_right">
            <slot name="userIco"></slot>
            <slot name="loginRegister"></slot>
            <slot name="changeCity"></slot>
        </div>
    </div>
</template>
<script>
import search_ico from '../../assets/img/search.png'
import user_ico from '../../assets/img/user.png'
import {getUser} from '../../service/getData'
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
    z-index:999;
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
    width: 60%;
}
</style>