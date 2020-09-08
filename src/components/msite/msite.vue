<template>
    <div id="msite">
        <common-head>
            <template>
                {{msiteAddress}}
            </template>
            <template v-slot:search>
                <img :src="searchIco"/>
            </template>
        </common-head>
        <!-- 头部轮播图 -->
        <mt-swipe class="swipe_container">
            <mt-swipe-item v-for="(swipe,swipeIndex) in swipeList" :key="swipeIndex" class="swipe_page" :auto="0">
                <router-link 
                    :to="{}" 
                    tag="div" 
                    class="swipe"
                    v-for="(foodType,foodIndex) in swipe" :key="foodIndex"
                >
                    <img :src="imgBaseUrl+foodType.image_url"/>
                    <span>{{foodType.title}}</span>
                </router-link>
            </mt-swipe-item>    
        </mt-swipe>
        
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
// 图标
import searchIco from '../../assets/img/search.png'
// 接口
import {getMsiteAddress,getMsiteFoodTypes,getShopList} from '../../service/getData'
// 公共域名
import {imgBaseUrl} from '../../config/env'
export default {
    data(){
        return {
            searchIco,
            imgBaseUrl,
            latitude:'',
            longitude: '',
            geograph: '',
            msiteAddress: '',
            swipeList : [],
        }
    },
    components:{
        commonHead
    },
    created(){
        this.latitude = this.$route.query.latitude;
        this.longitude = this.$route.query.longitude;
        this.geograph = this.latitude + ','+this.longitude ;
        // 1. 获取当前地址
        getMsiteAddress(this.geograph).then((res) => {
            let name = res.name;
            this.msiteAddress = name;
        }).catch((err) => {
            this.$toast({
                message: err,
                position: "center",
                duration: 1000
            });
        });
        // 2.获取轮播图的食品分类
        getMsiteFoodTypes(this.geograph).then((res) => {
            // 处理轮播图数据 swipeList = [[...],[...]];
            let swipePageOne = [];
            let swipePageTwo = [];
            for(var i=0;i<res.length;i++){
                if(i<8){
                    swipePageOne.push(res[i]);
                }else{
                    swipePageTwo.push(res[i]);
                }
            }
            this.swipeList.push(swipePageOne);
            this.swipeList.push(swipePageTwo);
        }).catch((err) => {
            this.$toast({
                message: err,
                position: "center",
                duration: 1000
            });
        });
        // 3. 获取商铺列表
        // getShopList().then((res) => {
        // })
    }
}
</script>
<style scoped>
.swipe_container{
    margin-top: 100px;
    background-color: #fff;
    height: 300px;
}
.swipe_page{
    font-size: 20px;
    color: #666;
    width: 100%;
    height: 300px;
}
.swipe{
    float: left;
    width: 25%;
}
.swipe img{
    width: 40%;
    display: block;
    margin: 0 auto;
}
.swipe span{
    display: block;
    margin: 20px;
}

.swipe_container .mint-swipe-indicators{
    bottom: -9px !important;
}
mint-swipe-indicators .mint-swipe-indicator.is-active{
    background-color: blue !important;
}
</style>