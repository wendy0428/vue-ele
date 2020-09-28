<template>
    <div id="msite">
        <common-head :headData=headData>
            <template>
                {{msiteAddress}}
            </template>
        </common-head>
        <!-- 头部轮播图 -->
        <mt-swipe class="swipe_container">
            <mt-swipe-item v-for="(swipe,swipeIndex) in swipeList" :key="swipeIndex" class="swipe_page" :auto="5000">
                <div class="swipe" v-for="(foodType,foodIndex) in swipe" :key="foodIndex">
                    <router-link :to="{path:'/food',query:{title:foodType.title,geograph,restaurant_category_id: getCategoryId(foodType.link)}}" tag="div">
                        <img :src="imgBaseUrl+foodType.image_url"/>
                        <span>{{foodType.title}}</span>
                    </router-link>
                </div>
            </mt-swipe-item>    
        </mt-swipe>
        <section class="shop_list_container">
            <span class="shop_list_container_title">附近商家</span>
            <shop-list :geograph=geograph></shop-list>
        </section> 
        <!-- 公共的底部 Tabber 组件 -->
        <tabbar :selectedTab="selectedTab"></tabbar>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const shopList = () => import('@/components/common/shopList')
const tabbar = () => import('@/components/footer/footGuide')

// 接口
import {getMsiteAddress,getMsiteFoodTypes,guessCity} from '../../service/getData'
// 公共域名
import {imgBaseUrl} from '../../config/env'
// 引入 vuex
import {mapMutations} from 'vuex'

export default {
    data(){
        return {
            headData:{
                showSearchIco: true,
            },
            imgBaseUrl,
            latitude:'',
            longitude: '',
            geograph: '',
            msiteAddress: '',
            swipeList : [],
            mShopList: [],
            offset:0,
            selectedTab:'外卖',
        }
    },
    components:{
        commonHead,
        shopList,
        tabbar
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
            this.RECORD_ADDRESS({latitude:_this.latitude,longitude:_this.longitude });
            this.SAVE_GEOHASH({geograph: _this.geograph})
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
           
        },
        // 解码url地址，求去restaurant_category_id值
    	getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
        },

    }
}
</script>
<style lang="scss" scoped>
.swipe_container{
    width: 100%;
    height: 300px;
    margin-top: 100px;
    padding-bottom: 40px;
    background-color: $color-bg-fff;
    @include border(0px,0px,2px,0px,#e4e4e4);
    font-size: 20px;
    .swipe_page{
        color: $color-font-666;
        .swipe{
            float: left;
            width: 25%;
            img{
                width: 40%;
                display: block;
                margin: 0 auto;
            }
            span{
                display: block;
                margin: 20px;
            }
        }
    }
}

.shop_list_container{
    background-color: $color-bg-fff;
    margin-top: 20px;
    @include border(2px,0px,0px,0px,#e4e4e4);
    .shop_list_container_title{
        color: $color-font-999;
        font-size: 0.4rem;
        display: block;
        text-align: left;
        margin: 10px 0px 0px 50px;
        &::after{
            @include backgroundICon(40px,40px,url('../../assets/img/house.png'),0px,0px,0px,10px);
        }
    }
}


</style>