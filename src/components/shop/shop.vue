<template>
    <div id="shop">
        <section class="shop_header" :style="background" v-if="shopDetails.image_path">
            <div class="shop_header_left">
                <img :src="'http://cangdu.org:8001/img/'+shopDetails.image_path"/>
            </div>
            <div class="shop_header_right">
                <span class="name">{{shopDetails.name}}</span>
                <span class="info">商家配送/{{shopDetails.order_lead_time}}/配送费{{shopDetails.float_delivery_fee}}</span>
                <span class="promotion">公告{{shopDetails.promotion_info}}</span>
            </div>
        </section>
        <!-- 商品和评价 切换 -->
        <section class="menu_header">
            <span class="select_title" :class="selected?'title_active':''" @click="changeNavBar">商品</span>
            <span class="select_title" :class="selected?'':'title_active'"  @click="changeNavBar">评价</span>
        </section>
        <section class="menu" ref="menu" :style="{height: wrapMenuHeight1+'px'}">
            <!-- 商品 -->
            <div v-if="selected" class="menu_container"  :style="{height: wrapMenuHeight1+'px'}">
                <div class="menu_left" ref="wrapperMenu" :style="{height: wrapMenuHeight1+'px'}" >
                    <ul>
                        <li v-for="(menuType,index) in menuList" :key="index" 
                            :class="menuIndex==index?'activity_menu':''"
                            @click="chooseMenu(index)"
                        >
                            <span>{{menuType.name}}</span>
                        </li>
                    </ul>
                </div>
                <!-- :style="{height: wrapMenuHeight+'px'}" -->
                <div class="menu_right" ref="menuFoodList" :style="{height: wrapMenuHeight1+'px'}" >
                    <ul class="menu_right_ul">
                        <li v-for="(menuType,menuIndex) in menuList" :key="menuIndex">
                            <header>
                                <span class="name">{{menuType.name}}</span>
                                <span class="description">{{menuType.description}}</span>
                            </header>
                            <ul class="foods">
                                <li v-for="(food,foodIndex) in menuType.foods" :key="foodIndex">
                                    <div class="food_left">
                                        <img :src="'http://cangdu.org:8001/img/'+food.image_path"/>
                                    </div>
                                    <div class="food_right">
                                        <div class="food_name">
                                            <span>{{food.name}}</span>
                                            <ul v-if="food.attributes" class="attribute">
                                                <li v-for="(attr,attrIndex) in food.attributes" :key="attrIndex">
                                                    <span v-if="attr">{{attr.icon_name}}</span>
                                                    <span v-else></span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="description">{{food.description}}</div>
                                        <div class="shop_date">
                                            <span v-if="food.month_sales">月售{{food.month_sales}}</span>
                                            <span v-if="food.satisfy_rate">好评率{{food.satisfy_rate}}%</span>
                                        </div>
                                        <div v-if="food.activity&&food.activity.image_text" class="activity">
                                            <span>{{food.activity.image_text}}</span>
                                        </div>
                                        <div class="price">
                                            <span>¥{{food.specfoods[0].price}}&nbsp;&nbsp;</span><span>起</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 评价 -->
            <div v-else>
                111
            </div>
        </section>
    </div>
</template>
<script>
import {getMsiteAddress,getShopDetails,getFoodMenu} from '../../service/getData'
import {mapState,mapMutations} from 'vuex'
import BScroll from 'better-scroll'

export default {
    data(){
        return {
            geograph:'', // 当前商铺的地理信息
            id: '', // 当前商铺的 id
            shopDetails:'', //当前商铺详情
            selected: true,
            menuList: [], // 当前商铺的菜单
            menuIndex: 0, // 左边 li 的 index
            foodListLiHeight: [], //右边食品列表每个 li 的 offsetTop
            menuIndexChange: true, // 解决运动时listenScroll依然监听的bug
            wrapMenuHeight1: '', 
            
        }
    },
    mounted(){
        this.geograph = this.$route.query.geograph;
        this.id = this.$route.query.id;
        this.initData();
      
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS']),
        async initData(){
            let _this = this;
            // 1. 防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
            if((!_this.latitude)||(!_this.longitude)){
                let msiteAddress = await getMsiteAddress(_this.geograph).then((res) => {
                    return res;
                }).catch((err)=>{
                    _this.$toast({
                        message: err,
                        position: 'center',
                        duration: 1000
                    })
                });
                _this.RECORD_ADDRESS({latitude:msiteAddress.latitude,longitude:msiteAddress.longitude})
            };
            // 2. 获取当前商铺详情
            getShopDetails(_this.id,_this.latitude,_this.longitude).then((res)=>{
                _this.shopDetails = res;
            }).catch((err)=>{
                _this.$toast({
                    message: err,
                    position: 'center',
                    duration: 1000
                })
            });

            // 3. 获取shop页面菜单列表
            _this.menuList = await getFoodMenu(_this.id).then((res) => {
                return res;
            }).catch((err)=>{
                _this.$toast({
                    message: err,
                    position: 'center',
                    duration: 2000
                })
            });
             
            _this.$nextTick(() => {
                // 获取右边商品列表每个 li 的 offsetTop
                _this.getRightFoodListHeight();
                
            });
        },
        // 获取右边食品列表,每个 li 的高度
        getRightFoodListHeight(){
            let _this = this;
            let rightFoodListContainer = _this.$refs.menuFoodList;
            if(rightFoodListContainer){
                // 获取右边商品列表中每个 li 的 offsetTop,保存到数组foodListLiHeight
                let foodListArr = rightFoodListContainer.children[0].children;
                let foodListLiHeight = [];
                for(let i=0;i<foodListArr.length;i++){
                    foodListLiHeight[i] = foodListArr[i].offsetTop;
                };
                _this.foodListLiHeight = foodListLiHeight;

                // 获取当前窗口可视区域的高度
                const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
                const clientHeight = document.documentElement.clientHeight;

                const wrapOfftopSet =  this.$refs.menu.offsetTop;
                // 左右滚动列表的高度 = 当前屏幕的高度-左右滚动列表距离当前屏幕顶部的绝对高度
                _this.wrapMenuHeight1 = clientHeight-wrapOfftopSet;
                console.log('clientHeight',clientHeight)
                console.log('wrapMenuHeight',wrapMenuHeight)
                console.log('wrapOfftopSet',wrapOfftopSet)
                // 左边的 ul
                _this.menu = new BScroll(_this.$refs.wrapperMenu,{
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true,
                });
                console.log('menu',this.menu)
                // 右边的 ul
                _this.foodScroll = new BScroll(_this.$refs.menuFoodList,{
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true,
                });
                console.log(this.foodScroll)
                _this.foodScroll.on('scroll',(pos) => {
                    if(!_this.$refs.wrapperMenu){
                        return;
                    }
                    _this.foodListLiHeight.forEach((item,index) => {
                        if(_this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item){
                            this.menuIndex = index;
                            const menuList=this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
                            const el = menuList[0];
                            _this.menu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
                       }
                    });
                 })
            }
        },
        // 点击左侧食品标题,右边相应的列表移动到最顶层
        chooseMenu(index){
            this.menuIndexChange = false;
            this.menuIndex = index;
            this.foodScroll.scrollTo(0,-this.foodListLiHeight[index],400);
            this.foodScroll.on('scrollEnd',()=>{
                this.menuIndexChange = true;
            });
        },
        // 商品和评论切换
        changeNavBar(){
            this.selected = !this.selected;
        },
   
    },
    computed:{
        ...mapState(['longitude','latitude']),
        // 动态的设置头部的背景图片
        background(){
            return {
                backgroundImage: `url(http://cangdu.org:8001/img/${this.shopDetails.image_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center,center'
            }
        }
    }
}
</script>
<style scoped>
.shop{
    position: relative;
    
}

/* 头部布局 */
.shop_header{
    width: 100%;
    height: 200px;
    background-color: rgba(119, 103, 137, 0.43);
    /* 背景图片的上面再去叠加一层背景颜色 */
    background-blend-mode: multiply; 
    font-size: 25px;
    color: #fff;
    display: flex;
    position: fixed;
    top: 0;
    font-weight: bold;
    z-index: 20;
}
.shop_header_left{
    width: 30%;
    position: relative;
}
.shop_header_left img{
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.shop_header_right{
    width: 70%;
}
.shop_header_right>span{
    display: block;
    text-align: left;
    margin-top: 15px;
}
.shop_header_right .name{
    font-size: 35px;
}   

/* 商品和评论 */
.menu_header{
    display: flex;
    position: fixed;
    width: 100%;
    height: 84px;
    top:200px;
    left: 0;
    z-index: 20;
}
.menu_header>span{
    display: inline-block;
    width: 50%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
}
.select_title{
    font-size: 30px;
}
.title_active{
    color: #3190e8;
    border-bottom: 4px solid #3190e8;
}
/* 主体列表 */
.menu{
    position: fixed;
    width: 100%;
    left: 0;
    top:284px;
    box-sizing: border-box;

}
.menu_container{
    position: fixed;
    top: 284px;
    width: 100%;
    left: 0; 
    overflow: hidden;
}
/* .menu_container::after{
    content: '';
    display: block;
} */

.menu_left{
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    overflow: hidden;
}

 ul{
    padding: 0;
    margin: 0;
}
li{
    list-style-type: none;
    font-size: 30px;
}

.menu_right{
    position: absolute;
    top: 0;
    left: 200px;
    height: 100vh;
    overflow: hidden;
}

.menu_left li{
    border-bottom: 1px solid #ededed;
    box-sizing: border-box;
    padding: 45px 0px;
    /* height: 120px; */
}

.menu_right_ul header{
    padding: 20px;
}
.menu_right_ul .name{
    color: #666;
    font-size: 35px;
    font-weight: bold;
}
.menu_right_ul .description{
    color: #999;
    font-size: 20px;
    margin-left: 20px;
}
.foods>li{
    width: 100%;
    display: flex;
    background-color:#fff;
    border-bottom: 4px solid #f8f8f8;
    padding: 10px 0px;
}
.food_left{
    width: 25%;
    position: relative;
}
.food_left img{
    border: 1px solid red;
    display: inline-block;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.food_right{
    width: 75%;
    padding-left: 20px;
}
.food_right>div{
    margin-top: 15px;
    display: flex;
}
.food_name>span{
    font-weight: bold;
    font-size: 35px;
}
.food_name{
    display: flex;
    justify-content: space-between;
}
.food_name ul{
    display: flex;
}
.food_name ul>li{
    margin-right: 10px;
}
.food_name ul>li>span{
    color: rgb(240, 115, 115);
    border: 1px solid rgb(240, 115, 115);
    border-radius: 10px;
    font-size: 15px;
    padding: 0 10px;

}
.food_name .description{
    color: #999;
}

.shop_date span{
    color: #333;
    font-size: 25px;
    padding-right: 10px;
}
.activity>span{
    display: inline-block;
    color: rgb(241, 136, 79);
    border: 1px solid rgb(240, 115, 115);
    font-size: 20px;
    border-radius: 10px;
}
.price>span:nth-child(1){
    color: #f60;
    font-weight: bold;
}
.activity_menu{
    border-left: 8px solid #3190e8;
    background-color: #fff;
}
</style>