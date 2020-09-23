<template>
    <div class="searchAddress"> 
        <common-head :headData=headData>
            <template>搜索地址</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="searchBox">
            <input type="text" v-model="inputAddress" placeholder="小区/写字楼/学校等" autocomplete="false"/>
            <span class="search_btn" @click="searchAddress">确认</span>
        </section>
        <section class="warn">
            <span>为了满足商家的送餐要求,建议您从列表中选择地址</span>
        </section>
        <!-- 搜索地址列表 -->
        <section class="searchPlaceList_box" v-if="searchPlaceList.length!=0">
            <ul>
                <li
                    v-for="(place,place_index) in searchPlaceList" :key="place_index"
                    @click="selectedThisAddress(place.name)"
                >
                    <div class="place_name">{{place.name}}</div>
                    <div class="pace_address">{{place.address}}</div>
                </li>
            </ul>
        </section>
        <section v-else class="notice has_no_result">
            <p>找不到地址?</p>
            <p>请尝试输入小区、写字楼或学校名</p>
            <p>详情地址(如门牌号)可稍后输入哦.</p>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {searchNearby} from '../../../../../../service/getData'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            inputAddress: '', // 输入收货地址
            searchPlaceList: [], // 搜索的地址
        }
    },
    methods:{
        // 搜索地址
        searchAddress(){
            // 2. 获取搜索的地址
            searchNearby(this.inputAddress).then((res) => {
                if(res.length){
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
        // 选中搜索地址
        selectedThisAddress(address){
            // 向 input 写入选中的内容
            this.inputAddress = address;
            // 向父视图传值 add.vue
            this.$emit('selectedAddress',address);
            // 回到父视图
            this.$router.go(-1);
        }
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.searchAddress{
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: #f2f2f2;
    z-index: 13;
}
.searchBox{
    margin-top: 90px;
    background-color: #fff;
    padding-bottom: 20px;
    padding-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.searchBox>input{
    width: 65%;
    padding-left: 20px;
    outline: 0;
    border: 1px solid #ddd;
    border-radius: 10px;
    color: #333;
    background-color: #f2f2f2; 
    font-size: 30px;
    box-sizing: border-box;
}
.search_btn{
    display: inline-block;
    width: 18%;
    border-radius: 20px;
    background-color: #3199e8;
    color: #fff;
    font-size: 40px;
    padding: 20px;
}
.warn{
    background-color: #FFF6E4;
    color:  #FF883F;
    font-size: 30px;
}

.notice{
    font-size: 30px;
    color: #969696;
    margin-top: 200px;
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

</style>