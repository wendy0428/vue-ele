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
/* 猜想的城市 */
.cityGuess_box{
    margin-top: 90px;
    background-color: $bg-red;
}
.cityGuess_box>div{
    display: flex;
    justify-content: space-between;
}
.cityGuess_box>div:nth-child(1){
    font-size: 30px;
    color: #666;
    padding: 25px;
    border-bottom: 2px solid #e4e4e4
}
.cityGuess_box>div:nth-child(2){
    color: #3190e8;
    font-size: 35px;
    padding: 15px 25px;
    border-bottom: 4px solid #e4e4e4
}
.cityGuess_box>div:nth-child(1)>span:nth-child(2){
    color: #9f9f9f;
    font-weight: 900;
    font-size: 25px;
}
.right_arrow{
    width: 50px;
    height: 50px;
    display: inline-block;
    background: url(../../assets/img/right_arrow.png) no-repeat;
    background-size:contain;
}
/* 热门城市 */
.hot_city_box{
    background-color: #fff;
}
.hot_city_box_title{
    font-size: 30px;
    color: #666;
    text-align: left;
    padding: 10px 25px;
    border-top: 4px solid #e4e4e4;
    margin-top:25px;
}
.hot_city_box_container,.groupCity_list_container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #e4e4e4;
}
.each_hot_city,.each_city{
    width: 25%;
    padding: 20px;
    color: #3190e8;
    font-size: 30px;
    border-right: 1px solid  #e4e4e4;
    border-bottom: 1px solid  #e4e4e4;
    box-sizing: border-box;
}
.hot_city_box_container>div:nth-child(4n){
    border-right: 0;
}
/* 所有城市列表 */
.each_groupCity{
    background-color: #fff;
    font-size: 35px;
    margin: 20px 0px;
    border-top: 4px solid #e4e4e4;
}

.each_city{
    color:#666;
    text-overflow:ellipsis; 
    white-space:nowrap;
    overflow:hidden; 
}

.each_groupCity_title{
    font-size: 25px;
    text-align: left;
    color: #666;
    padding: 10px 0px 10px 25px;
}
.tips{
    color: #999;
    font-size: 20px;
    margin-left: 10px;
}


</style>