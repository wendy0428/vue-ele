<template>
    <div class="search">
        <common-head :headData=headData>
            <template>搜索</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <!-- 搜索 -->
        <section class="search_box">
            <input type="text" placeholder="请输入商家或美食名称" autocomplete="false" v-model="inputKeyValue"/>
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
                    :to="{path:'/shop',query:{geograph:`${place.latitude},${place.longitude}`,id:place.id}}"
                >
                    <div class="place_left">
                        <img :src="'http://cangdu.org:8001/img/'+place.image_path"/>
                    </div>
                    <div class="place_right">
                        <div>
                            <span>{{place.name}}</span>
                        </div>
                        <div>
                            <span>月售{{place.recent_order_num}}单</span>
                        </div>
                        <div>
                            <span>{{place.float_minimum_order_amount}}元起送/距离{{place.distance}}</span>
                        </div>
                    </div>
                </router-link>
            </ul>
        </section>
        <section class="has_no_result" v-if="hasNoList">
            <div>很抱歉,无搜索结果!</div>
        </section>
        <section v-if="searchHistoryList.length!=0&&showHistory" class="history_container">
            <div>搜索历史</div>
            <ul class="history_ul">
                <li v-for="(search,searchIndex) in searchHistoryList" :key="searchIndex" @click="chooseThisHistory(search)">
                    <span>{{search}}</span>
                    <img :src="deleteIco" @click="deleteThisHistory(searchIndex)"/>
                </li>
            </ul>
            <div class="empty_history" @click="emptyHistoryList">清空搜索历史</div>
        </section>
        <!-- 公共的底部 Tabber 组件 -->
        <tabbar :selectedTab="selectedTab"></tabbar>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const tabbar = () => import('@/components/footer/footGuide')

import deleteIco from '../../assets/img/cha.png'

import {searchRestaurant} from '../../service/getData'
import {getStore,setStore,delStore} from '../../config/utils'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            headData:{
                goBack: true,
            },
            deleteIco,
            inputName: '',
            selectedTab:'搜索',
            inputKeyValue: '', // 输入的商家或者商品名称
            searchPlaceList : [], // 搜索到的商家或食品的列表
            searchHistoryList: [], // 搜索历史列表
            showHistory: true, // 是否展示搜索历史记录
            hasNoList: false, // 没有搜索到任何结果
        }
    },
    created(){
        this.initData();
    },
    methods:{
        async initData(){
            let searchHistory = getStore('searchHistory');
            if(searchHistory){
                this.searchHistoryList = JSON.parse(searchHistory); 
            }
        },
        // 搜索地址
        searchAddress(){
            // 2. 获取搜索的地址
            searchRestaurant(this.geograph,this.inputKeyValue).then((res) => {
                if(res.status == 0){
                    this.hasNoList = true;
                    this.showHistory = false;
                } else{
                    this.searchPlaceList = res;
                    this.hasNoList = false;
                    this.showHistory = false;
                }
                console.log('this.searchPlaceList',this.searchPlaceList);
            }).catch((err)=>{
                this.$toast({
                    message: err,
                    position: "center",
                    duration: 1000
                });
            });
            let index = this.searchHistoryList.indexOf(this.inputKeyValue);
            if(index == -1){
                this.searchHistoryList.unshift(this.inputKeyValue);
                setStore('searchHistory',this.searchHistoryList)
            }
        },
         // 清除 input 框中的值
        clearInputValue(){
            this.inputKeyValue = '';
        },
        // 删除该条搜索历史
        deleteThisHistory(index){
            this.initData();
            this.searchHistoryList.splice(index,1);
            setStore('searchHistory',this.searchHistoryList)
        },
        // 清空搜索历史
        emptyHistoryList(){
            delStore('searchHistory');
            this.showHistory = false;
        },
        // 选中当前搜索历史,作为搜索条件
        chooseThisHistory(search){
            this.inputKeyValue = search;
            this.searchAddress();
        },
        // 根据搜索到的商家,跳转到对应的商铺列表
        // goToThisShop(id,latitude,longitude){
        //     this.$router.push();
        // }
    },
    watch:{
        // 监听输入的值
        inputKeyValue(newVal){
            if(newVal == ''){
                this.showHistory = true;
                this.hasNoList = false;
            }
        }
    },
    computed:{
        ...mapState(['geograph']),
    },
    components:{
        commonHead,
        tabbar
    }
}
</script>
<style lang="scss" scoped>
.search{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
}
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
.searchPlaceList_box ul,.history_container ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    background-color: #fff;
}
.searchPlaceList_box ul li{
    display: flex;
    border-bottom: 1px solid #ededed;
}

.place_left{
    width: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 15px;
}
.place_left img{
    width: 80%;
}
.place_right{
    width: 75%;
    text-align: left;
    color: #333;
    box-sizing: border-box;
    padding: 15px;
}
.place_right>div{
    margin-bottom: 10px;
}

.pace_address{
    color: #999;
    font-size: 25px;
}
.has_no_result>div{
    font-size: 30px;
    color: #333;
    background: #fff;
    padding: 30px;
}

.history_container>div:nth-child(1){
    font-size: 30px;
    text-align: left;
    padding: 20px 30px;
}
.history_container ul li{
    text-align: left;
    padding: 20px 30px;
    border-bottom: 1px solid #e4e4e4;
    position: relative;
}
.history_container ul li img{
    width: 40px;
    height: 40px;
    background: url('../../assets/img/cha.png') no-repeat;
    position: absolute;
    right: 10px;
    top: 20%;
}
.empty_history{
    color: #3190e8;
    background-color: #fff;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
    padding: 20px 30px;
}
</style>