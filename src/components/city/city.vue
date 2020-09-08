<template>
    <div id="city">
        <common-head>
            <template v-slot:goBack>
                <img :src="leftArrowIcon" @click="goBackPage"/>
            </template>
            <template>
                <span v-if="currentCityName">{{currentCityName}}</span>
            </template>
            <template v-slot:head_right>
                <router-link :to="{name:'Home'}" tag="span">切换城市</router-link>
            </template>
        </common-head>
        <!-- 搜索 -->
        <section class="search_box">
            <input type="text" placeholder="输入学校、商务楼、地址" autocomplete="true" v-model="inputKeyValue"  v-on:keyup.13="searchAddress"/>
            <span class="clear_btn" v-if="inputKeyValue" @click="clearInputValue"></span>
            <div class="submit">
                <span @click="searchAddress">提交</span>
            </div>
        </section>
        <!-- 搜索地址列表 -->
        <section class="searchPlaceList_box" v-if="searchPlaceList.length!=0">
            <ul>
                <router-link 
                    v-for="(place,place_index) in searchPlaceList" :key="place_index"
                    tag="li"
<<<<<<< HEAD
                    :to="{path:'/msite',query:{latitude:place.latitude,longitude:place.longitude}}"
=======
                    :to="{}"
>>>>>>> 6b8df87351eb25bee89a56186769a0a17e7e7593
                    @click.native="pushToPlaceHistory(place)"
                >
                    <div class="place_name">{{place.name}}</div>
                    <div class="pace_address">{{place.address}}</div>
                </router-link>
            </ul>
        </section>
        <section v-else class="has_no_result">
            <div>很抱歉,无搜索结果!</div>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')

import leftArrowIcon from '../../assets/img/left_arrow.png'
import {getCurrentCity,searchPlace} from '../../service/getData'
import {setStore,getStore} from '../../config/utils'

// import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            leftArrowIcon,
            id: '',
            currentCityName:'',
            inputKeyValue: '',
            searchPlaceList : [],
            placeHistory: [],
        }
    },
    components:{
        commonHead
    },
    created(){
        let _this = this;
        // 获取当前城市的 id
        _this.id = _this.$route.params.id;
        // 1. 获取当前城市的信息
        getCurrentCity(_this.id).then((res) => {
            _this.currentCityName = res.name;
        })
        _this.initData();
    },
    methods:{
        initData(){
            let placeHistory = getStore('placeHistory');
            if(placeHistory){
                this.placeHistory = JSON.parse(placeHistory); 
                this.searchPlaceList = this.placeHistory;
            }
            this.$Toast({
                    message: "邮箱已拷贝",
                    position: "center",
                    duration: 1000
                });
        },
        // 返回上一页
        goBackPage(){
            this.$router.go(-1);
        },
        // 搜索地址
        searchAddress(){
            // 2. 获取搜索的地址
            searchPlace(this.id,this.inputKeyValue).then((res) => {
                if(res.length!== undefined){
                    this.searchPlaceList = res;
                }
            }).catch((err)=>{
<<<<<<< HEAD
                this.$toast({
                    message: err,
                    position: "center",
                    duration: 1000
                });
=======
                console.log(err);
>>>>>>> 6b8df87351eb25bee89a56186769a0a17e7e7593
            });
        },
        // 清除 input 框中的值
        clearInputValue(){
            let _this = this;
            _this.inputKeyValue = '';
        },
        // 搜索历史 存入缓存
        pushToPlaceHistory(place){
            let selectedPlace = place;
            if(this.placeHistory.length!=0){
                for(var i=0;i<this.placeHistory.length;i++){
                    if(this.placeHistory[i].latitude==selectedPlace.latitude){
                        return;
                    }
                }
                this.placeHistory.unshift(selectedPlace);   
            }else{
                this.placeHistory.unshift(selectedPlace);
            }
            setStore('placeHistory',this.placeHistory)
        }
       
    }
}
</script>
<style scoped>
.search_box{
    margin-top: 90px;
    background-color: #fff;
    color: #333;
    position: relative;
    padding-bottom: 20px;
    border-bottom: 4px solid #e4e4e4;
}
.search_box input{
    outline: 0;
    border: 1px solid #e4e4e4;
    width: 90%;
    padding: 25px 40px;
    box-sizing: border-box;
    border-radius: 10px;
}
.submit{
    width: 100%;
    font-size: 30px;
    margin-top: 20px;
}
.submit span{
    display: inline-block;
    width: 90%;
    margin: 0 auto;
    background: #3190e8;
    padding: 8px 40px;
    box-sizing: border-box;
    border-radius: 10px;
    color: #fff;
}
.clear_btn{
    display: block;
    width: 50px;
    height: 50px;
    background: url(../../assets/img/clear.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 40px;
    right: 50px
}
/* 搜索地址列表 */
.searchPlaceList_box ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    background-color: #fff;
}
.searchPlaceList_box ul li{
    border-bottom: 1px solid #e4e4e4;
    padding: 30px;
    text-align: left;
}
.searchPlaceList_box ul li div{
    margin-bottom: 10px;
}

.pace_address{
    color: #999;
    font-size: 25px;
}
.has_no_result{
    font-size: 20px;
    color: #333;
    background: #fff;
    padding-top: 30px;
}
</style>