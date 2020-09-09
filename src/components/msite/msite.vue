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
        <section class="shop_list_container">
            <shop-list :list="mShopList"></shop-list>
        </section>
        
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const shopList = () => import('@/components/common/shopList')

// 图标
import searchIco from '../../assets/img/search.png'
// 接口
import {getMsiteAddress,getMsiteFoodTypes,getShopList,guessCity} from '../../service/getData'
// 公共域名
import {imgBaseUrl} from '../../config/env'
// 引入 vuex
import {mapMutations} from 'vuex'
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
            mShopList: [],
            offset:0,
        }
    },
    components:{
        commonHead,
        shopList
    },
    created(){
        this.initData();
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS','SAVE_GEOHASH']),
        // 初始化,获取latitude,longitude
        async initData(){
            let _this = this;
            _this.latitude = _this.$route.query.latitude;
            _this.longitude = _this.$route.query.longitude;
            _this.geograph = _this.latitude + ','+_this.longitude ;
            if(!(_this.latitude && _this.longitude)){
                const address = await guessCity().then((res) => {
                    return res
                })
                _this.latitude = address.latitude;
                _this.longitude = address.longitude;
                _this.geograph = address.latitude + ','+address.longitude ;
            }
            getMsiteAddress(_this.geograph).then((res) => {
                let name = res.name;
                _this.msiteAddress = name;
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
            getShopList({latitude:this.latitude,longitude: this.longitude,offset: this.offset}).then((res) => {
                this.mShopList = res;
            })
        }
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