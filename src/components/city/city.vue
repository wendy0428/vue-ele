<template>
    <div id="city">
        <common-head :headData=headData>
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
                <li
                    v-for="(place,place_index) in searchPlaceList" :key="place_index"
                    @click="pushToPlaceHistory(place)"
                >
                    <div class="place_name">{{place.name}}</div>
                    <div class="pace_address">{{place.address}}</div>
                </li>
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
// 接口
import {getCurrentCity,searchPlace} from '../../service/getData'
import {setStore,getStore} from '../../config/utils'
export default {
    data(){
        return {
            headData:{
                goBack: true
            },
            id: '',
            currentCityName:'',
            inputKeyValue: '',
            searchPlaceList : [],
            placeHistory: [],
        }
    },
    components:{
        commonHead,
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
                this.$toast({
                    message: err,
                    position: "center",
                    duration: 1000
                });
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
            setStore('latitude',selectedPlace.latitude);
            setStore('longitude',selectedPlace.longitude);
            this.$router.push({path:'/msite',query:{latitude:selectedPlace.latitude,longitude:selectedPlace.longitude}});
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
            console.log('selectedPlace',selectedPlace);
            
        }
       
    }
}
</script>
<style lang="scss" scoped>
.search_box{
    margin-top: 90px ;
    padding-bottom: 20px;
    background-color: $color-bg-fff;
    color: $color-font-333;
    @include border(0px,0px,4px,0px,#e4e4e4);
    position: relative;

    input{
        outline: 0;
        @include border(1px,1px,1px,1px, #e4e4e4);
        width: 90%;
        padding: 25px 40px;
        box-sizing: border-box;
        border-radius: 10px;
    }
    .submit{
        width: 100%;
        font-size: 30px;
        margin-top: 20px;
        span{
            display: inline-block;
            width: 90%;
            margin: 0 auto;
            background: $color-font-3190e8;
            padding: 8px 40px;
            box-sizing: border-box;
            border-radius: 10px;
            color: $color-font-fff;
        }
    }

    .clear_btn{
        @include backgroundICon(50px,50px,url(../../assets/img/clear.png),40px,50px,0px,0px)
    }
}
.searchPlaceList_box{
    font-size: 30px;
    background-color: $color-bg-fff;
    li{
        @include border(0px,0px,1px,0px,#ededed);
        padding: 30px;
        text-align: left;
        div{
            margin-bottom: 10px;
        }
        div.pace_address{
            color: $color-font-999;
            font-size: 25px;
        }
    }

    .has_no_result{
        font-size: 20px;
        color: $color-font-333;
        background: $color-bg-fff;
        padding-top: 30px;
    }
}




</style>