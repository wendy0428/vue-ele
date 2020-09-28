<template>
    <div id="home">
        <!-- 公共头部 -->
        <common-head :headData=headData></common-head>
        <!-- 猜想的城市 -->
        <section class="cityGuess_box">
            <div>
                <span>当前定位的城市:</span>
                <span>定位不准时,请在城市列表中选择</span>
            </div>
            <div>
                <router-link :to="{path:`/city/${cityGuess.id}`}" tag="span" v-if="cityGuess">{{cityGuess.name}}</router-link>
                <span class="right_arrow"></span>
            </div>
        </section>
        <!-- 热门城市 -->
        <section class="hot_city_box" v-if="hotCityList.length!=0">
            <div class="hot_city_box_title">热门城市</div>
            <div class="hot_city_box_container">
                <router-link 
                :to="{path:`/city/${item.id}`}" 
                tag="div" 
                v-for="(item,index) in hotCityList" :key="index"
                class="each_hot_city"
                >{{item.name}}</router-link>
            </div>
        </section>
        <!-- 所有城市选项 -->
        <section class="city_group" v-if="groupCity_list.length!=0">
            <div v-for="(cities,Initials) in groupCity_list" :key="Initials" class="each_groupCity">
                <div class="each_groupCity_title"><span>{{Initials}}</span><span class="tips" v-if="Initials=='A'">(按字母顺序显示)</span></div>
                <div class="groupCity_list_container">
                    <router-link 
                        :to="{name:'City',params:{id:city.id}}"
                        tag="div"
                        v-for="(city,city_index) in cities" :key="city_index" 
                        class="each_city"
                    >
                        {{city.name}}
                    </router-link>
                </div>
            </div>
            
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {guessCity,getHotCity,getGroupCity} from '../../service/getData'
export default {
    data(){
        return {
            headData:{
                showEle: true
            },
            cityGuess: {},
            hotCityList: [],
            groupCity: {},
        }
    },
    components:{
        commonHead
    },
    created(){
        let _this = this;

        // 1. 猜想的城市
        guessCity().then((res) => {
            console.log('res',res);
            _this.cityGuess = res;
        }).catch((err)=>{
            this.$toast({
                message: err,
                position: "center",
                duration: 1000
            });
        });
        // 2. 热门的城市列表
        getHotCity().then((res) => {
            _this.hotCityList = res;
        }).catch((err)=>{
            this.$toast({
                message: err,
                position: "center",
                duration: 1000
            });
        });
        // 3. 获取所有城市
        getGroupCity().then((res) => {
            _this.groupCity = res;
        }).catch((err)=>{
            this.$toast({
                message: err,
                position: "center",
                duration: 1000
            });
        });
    },
    computed:{
        // 按字母 A-Z 的顺序重新排列,获取的所有城市
        groupCity_list(){
            let _this = this;
            // 用来保存,按顺序的数据
            let obj = {};
            for(var i=65;i<=90;i++){
                var captial = String.fromCharCode(i);
                var get_corresponding_city = _this.groupCity[captial];
                if(get_corresponding_city){
                    obj[captial] = get_corresponding_city;
                }
            }
            return obj;
        }
    },
}
</script>
<style lang="scss" scoped>
// 继承的样式
%common-container{
    @extend %common-container-flex;
    @include border(1px,0px,0px,0px,#e4e4e4);
}
%common-li{
    width: 25%;
    padding: 20px;
    color: $color-font-blue;
    font-size: 30px;
    @include border(0px,1px,1px,0px, #e4e4e4);
    box-sizing: border-box;
    @extend %common-text-overflow;
}

/* 猜想的城市 */
.cityGuess_box{
    margin-top: 90px;
    background-color: $color-bg-white;
    & > div{
        display: flex;
        justify-content: space-between;
        padding: 25px;
    }
    & > div:nth-child(1){
        font-size: 30px;
        color: $color-font-666;
        @include border(0px,0px,2px,0px,#e4e4e4);
        & > span:nth-child(2){
            color: $color-font-9f9f9f;
            font-weight: 900;
            font-size: 25px;
        }
    }
    & > div:nth-child(2){
        font-size: 35px;
        color: $color-font-blue;
        @include border(0px,0px,4px,0px,#e4e4e4);
        position: relative;
        > span{
            position: relative;
        }
    }
    .right_arrow::after{
        @include rightArrow(50px,50px,url('../../assets/img/right_arrow.png'),10px,5px,0px,0px);
    }
}


/* 热门城市 */
.hot_city_box{
    background-color: $color-bg-white;
    .hot_city_box_title{
        font-size: 30px;
        color: $color-font-666;
        text-align: left;
        padding: 10px 25px;
        @include border(0px,0px,4px,0px,#e4e4e4);
        margin-top:25px;
    };
    .hot_city_box_container{
        @extend %common-container;
        .each_hot_city{
            @extend %common-li;
        }
    }   
}
.city_group{
    .each_groupCity{
        background-color: $color-bg-white;
        font-size: 35px;
        margin: 20px 0px;

        .tips{
            color: $color-font-999;
            font-size: 20px;
            margin-left: 10px;
        }
        @include border(4px,0px ,0px ,0px ,#e4e4e4);
        .each_groupCity_title{
            font-size: 25px;
            text-align: left;
            color: $color-font-666;
            padding: 10px 0px 10px 25px;
        }
        .groupCity_list_container{
            @extend %common-container;
            & >div:nth-child(4n){
                border-right: 0;
            }
            .each_city{
                @extend %common-li;
            }
        }
    }
}
</style>