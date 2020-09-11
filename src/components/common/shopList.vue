<template>
    <div id="CommonshopList">
        <ul v-if="mShopList.length!==0" v-load-more="loadMoreShopList">
            <router-link :to="{}" tag="li"
            v-for="(shop,shopIndex) in mShopList" :key="shopIndex"
            class="each_shop"
            >
                <div class="box_left">
                    <img :src="'http://cangdu.org:8001/img/'+shop.image_path"/>
                </div>
                <div class="box_right">
                    <!-- 第一行 -->
                    <div class="box_right_top">
                        <span :class="shop.is_premium?'is_premium':''" class="box_right_top_name">{{shop.name}}</span>
                        <div class="box_right_top_icon_name" v-if="shop.supports&&shop.supports.length!=0">
                            <span v-for="(icon,iconIndex) in shop.supports" :key="iconIndex">{{icon.icon_name}}</span>
                        </div>
                    </div>
                    <!-- 第二行 -->
                    <div class="box_right_mid">
                        <div class="box_right_mid_rating">
                            <rating-star :rating="shop.rating"></rating-star>
                            <span class="shop_rating">{{shop.rating}}</span>
                            <span class="recent_order_num">月售{{shop.recent_order_num}}单</span>
                        </div>
                        <div class="box_right_mid_delivery_mode">
                            <span v-if="shop.delivery_mode" class="delivery_mode">{{shop.delivery_mode.text}}</span>
                            <span v-if="zhunshi(shop.supports)" class="supports">准时达</span>
                        </div>
                    </div>
                    <!-- 第三行 -->
                    <div class="box_right_bottom">
                        <span>¥{{shop.float_minimum_order_amount}}起送/配送费约¥{{shop.float_delivery_fee}}</span>
                        <span>{{shop.distance}}/<span>{{shop.order_lead_time}}</span></span>
                    </div>
                </div>
            </router-link>
        </ul>
        <span v-else class="serch_no_shop">暂时,没有数据!</span>
    </div>
</template>
<script>
// 公共域名
import {imgBaseUrl} from '../../config/env'
// 引入评分组件
const ratingStar = () => import('@/components/common/ratingStar')
// 引入接口
import {getShopList,getMsiteAddress} from '../../service/getData'
// 引入 vuex
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            mShopList: [],
            touchend: false , // 没有更多数据
            showBackStatus: false, // 返回顶部的图标是否显示
            preventRepeatReuqest: false, // 到达底部加载数据,防止重复加载
            offset: 0, // 批次加载店铺列表,每次加载20个 limit = 20
        }
    },
    components:{
        ratingStar
    },
    props:{
        geograph: String,
        restaurantCategoryId: [String, Number], // '分类'中的一级目录 id
        restaurantCategoryIds: [String, Number], // '分类'中的二级目录 id
        deliveryMode : String, // '筛选'中的配送方式
        supportIds : Array, // '筛选'中的商家属性
        searchSelected: Boolean, // 用来监听,父组件的确认按钮
        selectSortTypeId: [String, Number], // '排序'中选择具体的方式
    },
    computed:{
        ...mapState(['latitude','longitude'])
    },
    watch:{
        restaurantCategoryIds(){
            let _this = this;
              getShopList({
                latitude:_this.latitude,
                longitude:_this.longitude,
                offset: _this.offset,
                restaurant_category_id: _this.restaurantCategoryId,
                restaurant_category_ids: _this.restaurantCategoryIds,
                delivery_mode: _this.deliveryMode,
                support_ids: _this.supportIds,
                order_by: _this.selectSortTypeId
            }).then((res) => {
                _this.mShopList = res;
                if(_this.mShopList.length<20){
                    _this.touchend = true
                }
            })
        },
        
        searchSelected(){
             let _this = this;
              getShopList({
                latitude:_this.latitude,
                longitude:_this.longitude,
                offset: _this.offset,
                restaurant_category_id: _this.restaurantCategoryId,
                restaurant_category_ids: _this.restaurantCategoryIds,
                delivery_mode: _this.deliveryMode,
                support_ids: _this.supportIds,
                order_by: _this.selectSortTypeId
            }).then((res) => {
                _this.mShopList = res;
                if(_this.mShopList.length<20){
                    _this.touchend = true
                }
            })
        },
        selectSortTypeId(){
            let _this = this;
              getShopList({
                latitude:_this.latitude,
                longitude:_this.longitude,
                offset: _this.offset,
                restaurant_category_id: _this.restaurantCategoryId,
                restaurant_category_ids: _this.restaurantCategoryIds,
                delivery_mode: _this.deliveryMode,
                support_ids: _this.supportIds,
                order_by: _this.selectSortTypeId
            }).then((res) => {
                _this.mShopList = res;
                if(_this.mShopList.length<20){
                    _this.touchend = true
                }
            })
        }
    },
    created(){
        this.initDate();
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS']),
        async initDate(){
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
            // 3. 获取商铺列表
            getShopList({
                latitude:_this.latitude,
                longitude:_this.longitude,
                offset: _this.offset,
                restaurant_category_id: _this.restaurantCategoryId,
                restaurant_category_ids: _this.restaurantCategoryIds,
                delivery_mode: _this.deliveryMode,
                support_ids: _this.supportIds,
                order_by: _this.selectSortTypeId
            }).then((res) => {
                _this.mShopList = res;
                if(_this.mShopList.length<20){
                    _this.touchend = true
                }
            })
        },
        // 是否显示'准时达'标签
        zhunshi(supports){
            let supportStatus;
            if((supports instanceof Array) && supports.length!=0){
                supports.forEach((item) => {
                    if(item.icon_name === '准'){
                        supportStatus = true;
                    }
                });
            }else{
                supportStatus = false
            }
            return supportStatus
        },
        async loadMoreShopList(){
            let _this = this;
            // 当第一次请求回来的商铺列表小于20条的时候,说明已经没有更多数据了就直接返回
            if(_this.touchend){
                return;
            }
            // 用该变量,防止重复加载
            if(_this.preventRepeatReuqest){
                return;
            }
            _this.preventRepeatReuqest = true;
            // 数据定位加20
            _this.offset += 20;
            let res = await getShopList({
                latitude:_this.latitude,
                longitude: _this.longitude,
                offset: _this.offset,
                restaurant_category_id: _this.restaurantCategoryId,
                restaurant_category_id: _this.restaurantCategoryIds,
                delivery_mode: _this.deliveryMode,
                support_ids: _this.supportIds
            }).then((res) => {
                return  res;
            });
            _this.mShopList = [..._this.mShopList,...res];
            // 当获取的数据小于20的时候,说明没有更多数据了,不需要再次请求数据
            if(res.length < 20){
                _this.touchend = true;
                return;
            }
            _this.preventRepeatReuqest = false;
        },

    },
    directives: {
        'load-more':{
            bind: (el,binding) => {
                let windowHeight = window.screen.height;
                // console.log("返回以像素计的访问者屏幕的高度",windowHeight);
                let clientHeight;
                let offsetTop;
                let oldScrollTop;
                let requestFram;
                // 在开始触摸的时候获取 当前 ul元素的高度 和 ul 相对于文档 document的 top 绝对位移
                el.addEventListener('touchstart',() => {
                    // element.clientHeight: 在页面上返回内容的可视高度（不包括边框，边距或滚动条）height+上下padding
                    clientHeight = el.clientHeight;
                    // console.log('在页面上返回内容的可视高度',clientHeight);
                    // offsetTop:返回当前元素的相对垂直偏移位置的偏移容器. 可以理解为容器相对于document的top的绝对偏移。等于top+margin
                    offsetTop = el.offsetTop;
                    // console.log('返回当前元素的相对垂直偏移位置的偏移容器',offsetTop);
                },false)

                el.addEventListener('touchmove',() => {
                    loadMore(); 
                },false);

                el.addEventListener('touchend',() => {
                    oldScrollTop = document.documentElement.scrollTop;
                    // console.log('oldScrollTop',oldScrollTop);
                    moveEnd();
                },false);

                const moveEnd = () => {
					requestFram = requestAnimationFrame(() => {
						if (document.documentElement.scrollTop != oldScrollTop) {
							oldScrollTop = document.documentElement.scrollTop;
							moveEnd()
						} else {
							cancelAnimationFrame(requestFram);
							clientHeight = el.clientHeight;
							loadMore();
						}
					})
                }
                
                const loadMore = () => {
                    // 当前 ul元素的高度+当前 ul元素相对于document的top的绝对偏移-可视窗口的高度-滚动条的高度>2
                    if(clientHeight+offsetTop-windowHeight-oldScrollTop<2){
                        binding.value();
                    }
                }

            }
        }
    }
}
</script>
<style scoped>
#CommonshopList{
    height: 100vh;
}
.box_left{
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;  
}
.box_right{
    width: 70%;
    padding-right: 20px;
}
ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.each_shop{
    display: flex;
    width: 100%;
    height: 220px;
    border-bottom: 2px solid #e4e4e4;
    box-sizing: border-box;
}


.box_left img{
    width: 70%;
}

.is_premium::before{
    content: '品牌';
    display: inline-block;
    background-color:#ffd930;
    font-size: 25px;
    padding:  2px 10px;
    border-radius: 10px;
    margin-right:10px;
}
.is_premium,.box_right_top_name{
    font-size: 35px;
    font-weight: bold;
    font-size: 0.466667rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 300px;
    text-align: left;
}
.box_right_top,.box_right_mid,.box_right_bottom{
    width : 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.box_right_top_icon_name{
    font-size: 20px;
    color: #999;
}
.box_right_top_icon_name span{
    display: inline-block;
    border: 1px solid #f1f1f1;
    padding: 5px;
}
.shop_rating{
    color: #ff6000;
    font-size: 20px;
}
.recent_order_num,.box_right_mid_delivery_mode{
    font-size: 20px;
    color: #666;
}
.box_right_mid_rating{
    display: flex;
}
.delivery_mode{
    color: #fff;
    background-color: #3190e8;
    border: 1px solid #3190e8;
}
.supports{
    color:#3190e8;
    border: 1px solid #3190e8;
    margin-left:2px;
}
.box_right_bottom span{
    color: #666;
    font-size: 20px;
}
.serch_no_shop{
    font-size: 20px;
}
</style>