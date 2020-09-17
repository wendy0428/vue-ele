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
            <img :src="leftArrowIcon" class="leftArrow" @click="goBack"/>
            <img :src="rightArrowIcon" class="rightArrow" @click="showShopDetail"/>
        </section>
        <!-- 商品和评价 切换 -->
        <section class="menu_header">
            <span class="select_title" :class="selected?'title_active':''" @click="changeNavBar">商品</span>
            <span class="select_title" :class="selected?'':'title_active'"  @click="changeNavBar">评价</span>
        </section>
        <section class="menu" ref="menu">
            <!-- 商品 -->
            <div v-if="selected" class="menu_container"  :style="{height: menuContainerHight+'px'}" >
                <div class="menu_left" ref="menuClassification">
                    <ul>
                        <li v-for="(menuType,index) in menuList" :key="index" 
                            :class="menuIndex==index?'activity_menu':''"
                            @click="chooseMenu(index)"
                        >
                            <span>{{menuType.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="menu_right" ref="menuFoodList">
                    <ul class="menu_right_ul">
                        <li v-for="(menuType,menuIndex) in menuList" :key="menuIndex">
                            <header>
                                <span class="name">{{menuType.name}}</span>
                                <span class="description">{{menuType.description}}</span>
                                <img :src="dotsIcon" class="dots" @click="showDescription(menuIndex)"/>
                                <div class="description_tips" v-if="tipsIndex==menuIndex">
                                    <span>{{menuType.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{menuType.description}}</span>
                                </div>
                            </header>
                            <ul class="foods">
                                <li v-for="(food,foodIndex) in menuType.foods" :key="foodIndex">
                                    <div class="food_left">
                                        <img :src="'http://cangdu.org:8001/img/'+food.image_path"/>
                                    </div>
                                    <div class="food_right">
                                        <div class="food_name">
                                            <span class="name">{{food.name}}</span>
                                            <ul v-if="food.attributes" class="attribute">
                                                <li v-for="(attr,attrIndex) in food.attributes" :key="attrIndex">
                                                    <span v-if="attr">{{attr.icon_name}}</span>
                                                    <span v-else></span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="description">
                                            <span>{{food.description}}</span>
                                        </div>
                                        <div class="shop_date">
                                            <span v-if="food.month_sales">月售{{food.month_sales}}</span>
                                            <span v-if="food.satisfy_rate">好评率{{food.satisfy_rate}}%</span>
                                        </div>
                                        <div v-if="food.activity&&food.activity.image_text" class="activity">
                                            <span>{{food.activity.image_text}}</span>
                                        </div>
                                        <div class="price">
                                            <div><span>¥{{food.specfoods[0].price}}&nbsp;&nbsp;</span>起</div>
                                            <buy-cart :shopid="id" :food="food"></buy-cart>
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
        <section class="cart_container">
            <div>
                <!-- <img :src="grayartIcon"/> -->
                <span>还差¥{{shopDetails.float_minimum_order_amount}}</span>
            </div>
        </section>
        
        <!-- 商铺详情 -->
        <router-view>
            
        </router-view>

    </div>
</template>
<script>
import {getMsiteAddress,getShopDetails,getFoodMenu} from '../../service/getData'
import {mapState,mapMutations} from 'vuex'
import BScroll from 'better-scroll'

import buyCart from '../../components/common/buyCart'

import dotsIcon from '../../assets/img/dots.png'
import rightArrowIcon from '../../assets/img/right_arrow.png'
import leftArrowIcon from '../../assets/img/left_arrow.png'
import blueCartIcon from '../../assets/img/blueCart.png'
import grayartIcon from '../../assets/img/grayCart.png'
export default {
    data(){
        return {
            geograph:'', // 当前商铺的地理信息
            id: '', // 当前商铺的 id
            shopDetails:'', //当前商铺详情
            selected: true,
            menuList: [], // 当前商铺的菜单
            menuIndex: 0, // 左边 li 的 index
            foodListLiOffsetTop: [], //右边食品列表每个 li 的 offsetTop
            menuIndexChange: true, // 解决运动时listenScroll依然监听的bug
            menuContainerHight: 0, // 左右列表的区域的高度
            htmlClientHeight: 0, // 当前页面可视区域的高度
            dotsIcon,
            rightArrowIcon,
            leftArrowIcon,
            blueCartIcon,
            grayartIcon,
            tipsIndex: null, // 右边 li 的 description的显示与隐藏 
        }
    },
    mounted(){
        this.geograph = this.$route.query.geograph;
        this.id = this.$route.query.id;

        // 当前页面可视区域的高度
        const htmlClientHeight = document.documentElement.clientHeight;
        this.htmlClientHeight = htmlClientHeight;
        // menu元素距离 body 顶部的距离(因为 menu 没有一个具有定位的祖宗元素,所以就只能找到 body)
        const offsetTop =  this.$refs.menu.offsetTop;
        // 左右列表的区域的高度 = 当前页面可视区域的高度-menu元素距离 body 顶部的距离
        // -50是为了底部留白,放购物车组件
        this.menuContainerHight = this.htmlClientHeight-offsetTop-50;

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
                // 获取右边食品列表,每个 li 距离 ul 顶部的绝对距离(offsetTop)
                _this.getRightFoodListHeight();
              
                // 初始化 左边商品分类
                _this.menuScroll = new BScroll(_this.$refs.menuClassification,{
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true,
                });
                // 初始化 右边的具体商品
                _this.foodScroll = new BScroll(_this.$refs.menuFoodList,{
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true,
                });
                // 监听右边的滚动事件
                _this.foodScroll.on('scroll',(pos) => {
                    _this.foodListLiOffsetTop.forEach((item,index) => {
                        if(_this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item){
                            this.menuIndex = index;
                            const menuList=this.$refs.menuClassification.querySelectorAll('.activity_menu');
                            const el = menuList[0];
                            // 根据右边的鼠标滚动距离,左边移动到对应的分类上
                            _this.menuScroll.scrollToElement(el, 800, 0, -(_this.htmlClientHeight/2 - 50));
                        }
                    });
                 })
                
            });
        },
        // 获取右边食品列表,每个 li 距离 ul 顶部的绝对距离(offsetTop)
        getRightFoodListHeight(){
            let _this = this;
            let menuFoodList = _this.$refs.menuFoodList;
            if(menuFoodList){
                // 获取右边商品列表中每个 li 的 offsetTop,保存到数组foodListLiOffsetTop
                let foodListLiArr = Array.from(menuFoodList.children[0].children);
                let foodListLiOffsetTop = [];
                foodListLiArr.forEach((item,index)=>{
                    foodListLiOffsetTop[index] = item.offsetTop;
                });
                _this.foodListLiOffsetTop = foodListLiOffsetTop;
            }
        },
        // 点击左侧商品分类,右边相应的列表移动到最顶层
        chooseMenu(index){
            this.menuIndexChange = false;
            this.menuIndex = index;
            this.foodScroll.scrollTo(0,-this.foodListLiOffsetTop[index],400);
            this.foodScroll.on('scrollEnd',()=>{
                // 解决运动时listenScroll依然监听的bug
                this.menuIndexChange = true;
            });
        },
        // 返回上一页
        goBack(){
            this.$router.go(-1);
        },
        // 跳转至商家详情页
        showShopDetail(){
            this.$router.push({path:'/shop/shopDetail',query:{shopDetails:JSON.stringify(this.shopDetails)}});
        },
        // 商品和评论切换
        changeNavBar(){
            this.selected = !this.selected;
        },
        // 展示与隐藏每个产品分类的描述
        showDescription(menuIndex){
            console.log('this.tipsIndex0',this.tipsIndex);
            if(this.tipsIndex == undefined){
                this.tipsIndex = menuIndex;
                console.log('this.tipsIndex1',this.tipsIndex);
            }else{
                this.tipsIndex = null;
                 console.log('this.tipsIndex2',this.tipsIndex);

            }
        },
    },
    computed:{
        ...mapState(['longitude','latitude','cartList']),
        // 动态的设置头部的背景图片
        background(){
            return {
                backgroundImage: `url(http://cangdu.org:8001/img/${this.shopDetails.image_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center,center'
            }
        }
    },
    components:{
        buyCart
    }
}
</script>
<style scoped>
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
.shop_header .leftArrow,.shop_header .rightArrow{
    position: absolute;
    width: 50px;
}
.shop_header .rightArrow{
    width: 80px;
    right: 0;
    bottom: 40%;
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
    /* position: fixed;
    top: 284px;
    width: 100%;
    height: 100vh;
    left: 0; 
    overflow: hidden; */
}

.menu_left{
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
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
    height: 100%;
    overflow: hidden;
}

.menu_left li{
    border-bottom: 1px solid #ededed;
    box-sizing: border-box;
    padding: 45px 0px;
}

.menu_right_ul header{
    padding: 20px;
    text-align: left;
    position: relative;
}
.dots{
    display: inline-block;
    vertical-align: middle;
    width: 50px;
    position: absolute;
    right: 10px;
}
.description_tips{
    position: absolute;
    right: 10px;
    background-color: #39373a;
    color: #fff;
    border-radius: 10px;
    font-size: 20px;
    padding: 20px 80px 20px 20px;
}
.description_tips::after{
    content:'';
    width: 20px;
    height: 20px;
    background-color: #39373a;
    position: absolute;
    top: -10px;
    right: 15px;
    transform: rotate(-45deg);
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
    margin-top: 10px;
    display: flex;
}
.food_name>span{
    font-weight: bold;
    font-size: 35px;
}
.food_name .name{
    display: inline-block;
    width: 200px;
    text-overflow:ellipsis; 
    white-space:nowrap;
	overflow:hidden;
    text-align: left;
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
.price {
    justify-content: space-between;
}
.buyCart{
    margin-right: 10px
}

.price span:nth-child(1){
    color: #f60;
    font-weight: bold;
}
.activity_menu{
    border-left: 8px solid #3190e8;
    background-color: #fff;
}
.cart_container{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 100px;
    font-size: 40px;
    color: #fff;
    background-color: #3d3d3f;
}
</style>