<template>
    <div id="city">
        <common-head>
            <template v-slot:goBack>
                <img :src="left_arrow_icon" @click="goBackPage"/>
            </template>
            <template>
                <span v-if="current_city_name">{{current_city_name}}</span>
            </template>
            <template v-slot:changeCity>
                <router-link :to="{name:'Home'}" tag="span">切换城市</router-link>
            </template>
        </common-head>
        <!-- 搜索 -->
        <section class="search_box">
            <input type="text" placeholder="输入学校、商务楼、地址" autocomplete="true" v-model="input_key_value"  v-on:keyup.13="searchAddress"/>
            <span class="clear_btn" v-if="input_key_value" @click="clearInputValue"></span>
            <div class="submit">
                <span @click="searchAddress">提交</span>
            </div>
        </section>
        <!-- 搜索地址列表 -->
        <section class="search_place_list_box" v-if="search_place_list.length!=0">
            <ul>
                <router-link 
                    v-for="(place,place_index) in search_place_list" :key="place_index"
                    tag="li"
                    :to="{}"
                    @click="pushToPlaceHistory(place)"
                >
                    <div class="place_name">{{place.name}}</div>
                    <div class="pace_address">{{place.address}}</div>
                </router-link>
            </ul>
        </section>
    </div>
</template>
<script>
// 公共头部组件
import left_arrow_icon from '../../assets/left_arrow.png'
import clear_icon from '../../assets/clear.png'
const commonHead = () => import('@/components/header/head')
import {currentcity,searchplace} from '../../service/getDate'
import {setStore,getStore} from '../../service/mUtils'
export default {
    data(){
        return {
            left_arrow_icon,
            id: '',
            current_city_name:'',
            input_key_value: '',
            search_place_list : [],
            placeHistory: [],
        }
    },
    components:{
        commonHead
    },
    created(){
        let that = this;
        // 获取当前城市的 id
        that.id = that.$route.params.id;
        // 1. 获取当前城市的信息
        currentcity(that.id).then((res) => {
            that.current_city_name = res.name;
        })
        that.initDate();
    },
    methods:{
        initDate(){
            let placeHistory = getStore('placeHistory');
            if(placeHistory){
                this.placeHistory = placeHistory;
            }else{
                setStore('placeHistory',[])
            }
        },
        // 返回上一页
        goBackPage(){
            this.$router.go(-1);
        },
        // 搜索地址
        searchAddress(){
            let that = this;
            // 2. 获取搜索的地址
            searchplace(that.id,this.input_key_value).then((res) => {
                that.search_place_list = res;
            });
        },
        // 清除 input 框中的值
        clearInputValue(){
            let that = this;
            that.input_key_value = '';
        },
        // 搜索历史 存入缓存
        pushToPlaceHistory(placeHistory){
            // ... 2020.9.4
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
    background: url(../../assets/clear.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 40px;
    right: 50px
}
/* 搜索地址列表 */
.search_place_list_box ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    background-color: #fff;
}
.search_place_list_box ul li{
    border-bottom: 1px solid #e4e4e4;
    padding: 30px;
    text-align: left;
}
.search_place_list_box ul li div{
    margin-bottom: 10px;
}

.pace_address{
    color: #999;
    font-size: 25px;
}
</style>