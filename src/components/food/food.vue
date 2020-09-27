<template>
    <div id="food">
        <common-head :headData=headData>
            <template v-if="title">{{title}}</template>
        </common-head>
        <div class="back_cover" v-if="showBackCover"></div>
        <section class="navbar_container">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1" @click.native="changeClassify">
                    <span>{{title}}</span>
                    <img :src="classify?upIcon:downIcon"/>
                </mt-tab-item>
                <mt-tab-item id="2" @click.native="changeSort">
                    <span>排序</span>
                    <img :src="sort?upIcon:downIcon"/>
                </mt-tab-item>
                <mt-tab-item id="3" @click.native="changeSelect">
                    <span>筛选</span>
                    <img :src="classify?upIcon:downIcon"/>
                </mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected" v-if="showBackCover">
                <!-- 分类 -->
                <mt-tab-container-item id="1" class="category_container">
                    <li>
                        <div class="category_left">
                            <div  v-for="(eachCategory,categoryIndex) in foodCategory" :key="categoryIndex" 
                                @click="changeCategory(eachCategory.id,eachCategory.sub_categories)"     
                                :class="restaurant_category_id==eachCategory.id ?'activeClass1':''"
                            >
                                <img :src="'https://fuss10.elemecdn.com/'+eachCategory.image_url" class="icon"/>
                                <span class="name">{{eachCategory.name}}</span>
                                <span class="count">{{eachCategory.count}}</span>
                            </div>
                        </div>
                        <div class="category_right" v-if="subCategories">
                            <li  v-for="(subCategory,subCategoryIndex) in subCategories" :key="subCategoryIndex" 
                                @click="changeFoodType(subCategory.id,subCategory.name)"    
                                :class="restaurant_category_ids ==subCategory.id ?'activeClass2':''"
                            >
                                <span class="sub_name">{{subCategory.name}}</span>
                                <span class="sub_count">{{subCategory.count}}</span>
                            </li>
                        </div>
                    </li>
                </mt-tab-container-item>
                <!-- 排序 -->
                <mt-tab-container-item id="2" class="sort_container">
                    <div v-for="(sortType,sortTypeIndex) in sortTypeList" :key="sortTypeIndex" 
                        class="sortType"
                        @click="selectSortType(sortType.id)"
                    >
                        <img :src="sortType.icon"/>
                        <span>{{sortType.name}}</span>
                        <img :src="duigou" v-if="sortType.id == selectSortTypeId" class="is_selected"/>
                    </div>
                </mt-tab-container-item>
                <!-- 筛选 -->
                <mt-tab-container-item id="3">
                    <div class="delivery_attr_container">
                        <div class="delivery_title">配送方式</div>
                        <div class="delivery_container">
                            <span  v-for="(delivery,deliveryIndex) in deliveryModes" :key="deliveryIndex" 
                                class="each_delivery"
                                @click="chooseDelivery(delivery.id)"
                            >
                                <img :src="delivery_mode_arr.indexOf(delivery.id)==-1?fengniao:duigou"/>
                                <span>{{delivery.text}}</span>
                            </span>
                        </div>
                        <div class="attr_title">商家属性(可以多选)</div>
                        <div class="attr_container">
                            <span v-for="(atrr,attrIndex) in shopAttribute" :key="attrIndex" 
                                class="each_atrr"
                                @click="chooseAttrs(atrr.id)"
                            >
                                <img :src="support_ids.indexOf(atrr.id)==-1?iconsArr[attrIndex]:duigou"/>
                                <span>{{atrr.name}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="btns">
                        <span class="clear" @click="clear">清空</span>
                        <span class="confirm" @click="search">确定</span>
                    </div>
                </mt-tab-container-item> 
            </mt-tab-container>
        </section>
        <shop-list 
            :restaurant-category-id = restaurant_category_id
            :restaurant-category-ids = restaurant_category_ids
            :delivery-mode = delivery_mode
            :support-ids = support_ids
            :geograph = geograph
            :search-selected = searchSelected
            :select-sort-type-id = selectSortTypeId
            class="shop_list"
        ></shop-list>
    </div>
</template>
<script>
// 引入图标
import upIcon from '../../assets/img/upIcon.png'
import downIcon from '../../assets/img/downIcon.png'

import duigou from '../../assets/img/duigou.png'
import fengniao from '../../assets/img/fengniao.png'
import pinpai from '../../assets/img/pinpai.png'
import bao from '../../assets/img/bao.png'
import zhun from '../../assets/img/zhun.png'
import xin from '../../assets/img/xin.png'
import fu from '../../assets/img/fu.png'
import piao from '../../assets/img/piao.png'

import paixu from '../../assets/img/paixu.png'
import juli from '../../assets/img/juli.png'
import xiaoliang from '../../assets/img/xiaoliang.png'
import jiage from '../../assets/img/jiage.png'
import shijian from '../../assets/img/shijian.png'
import pingfen from '../../assets/img/pingfen.png'

// 公共头部组件
const commonHead = () => import('@/components/header/head')
const shopList = () => import('@/components/common/shopList')
import {getMsiteAddress,getFoodCategory,getFoodDelivery,getShopAttribute,getShopList} from '../../service/getData'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true
            },
            upIcon,
            downIcon,
            fengniao,
            duigou,
            iconsArr:[
                pinpai,
                bao,
                zhun,
                xin,
                fu,
                piao
            ],
            title:'排序',
            geograph:'',
            selected:'',

            // 分类
            classify: true, // 控制分类目录中的标题显示
            sort: true, // 控制排序目录中的标题显示
            select: true,// 控制排序目录中的标题显示

            foodCategory: [], // 分类中的一级目录
            subCategories: [], // 分类中的二级目录
            restaurant_category_id:'', // "分类 "中 的一级目录中的的 id
            restaurant_category_ids: '', // "分类 "中 的二级分类的 id

            // 排序
            sortTypeList :[
                {
                    id: 0,
                    icon: paixu,
                    name: '智能排序'    
                },
                {
                    id: 5,
                    icon: juli,
                    name: '距离最近'    
                },
                {
                    id: 6,
                    icon: xiaoliang,
                    name: '销量最高'    
                },
                {
                    id: 1,
                    icon: jiage,
                    name: '起送价最低'    
                },
                {
                    id: 2,
                    icon: shijian,
                    name: '配送时间最快'    
                },
                {
                    id: 3,
                    icon: pingfen,
                    name: '评分最高'    
                },
            ],
            selectSortTypeId: '', //选中排序方式的 id 
            
            // 筛选
            deliveryModes: [], // 配送方式
            delivery_mode_arr: [], // 选中的配送方式的 id
            delivery_mode: '', // 选中的配送方式的 id 转为字符串
            shopAttribute:[], // 商家属性
            support_ids: [], //选中的商家属性的 id
            searchSelected: true, // 点击筛选中的确认按钮,子组件进行监听,调用列表接口
            showBackCover: false,
        }
    },
    components:{
        commonHead,
        shopList
    },
    watch:{
        // 是否显示背景遮罩层
        selected(){
            if(!this.selected){
                this.showBackCover = false;
            }else{
                this.showBackCover = true;
            }
        },
    },
    created(){
        this.title = this.$route.query.title;
        this.geograph =  this.$route.query.geograph;
        this.restaurant_category_id = this.$route.query.restaurant_category_id;
        this.initDate()
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS','SAVE_GEOHASH']),
        async initDate(){
            // 1. 分类
            this.foodCategory = await getFoodCategory(this.latitude,this.longitude).then((res) => {
                return res;
            }).catch((err)=>{
                this.$toast({
                    message: err,
                    position: 'center',
                    duration: 1000
                })
            });
            // 默认二级目录,显示一级目录下面的
            this.subCategories = this.foodCategory[0].sub_categories;
            // 2. 配送方式
            this.deliveryModes = await getFoodDelivery(this.latitude,this.longitude).then((res) => {
                return res;
            }).catch((err)=>{
                this.$toast({
                    message: err,
                    position: 'center',
                    duration: 1000
                })
            });
            // 3. 商家属性
            this.shopAttribute = await getShopAttribute(this.latitude,this.longitude).then((res) => {
                return res;
            }).catch((err)=>{
                this.$toast({
                    message: err,
                    position: 'center',
                    duration: 1000
                })
            });
        },
        // 点击"分类 "中 的一级目录: ①当前选中添加 activeClass1 样式 ②切换右边分类中的对应的数据
        changeCategory(id,sub_categories){
            this.restaurant_category_id = id;
            this.subCategories = sub_categories;
        },
        // 点击"分类 "中 的二级目录: ①当前选中添加 activeClass2 样式 ②改变整体页面的 title
        changeFoodType(id,name){
            this.restaurant_category_ids = id;
            this.title = name;
            this.selected = ''

        },
        // 点击 "分类", ①切换对应的文案 ②显示隐藏对应的 navbar 具体内容
        changeClassify(){
            // 控制 标题文字的显示
            this.classify = !(this.classify);
            // 控制显示和隐藏,下面的种类框
            if(this.classify){
                this.selected = ''
            }
        },
        // 点击排序
        changeSort(){
            this.sort = !this.sort
            if(this.sort){
                this.selected = ''
            }
        },
        // 点击 筛选
        changeSelect(){
            this.select = !this.select
            if(this.select){
                this.selected = ''
            }
        },
        // 点击"筛选"中的'配送方式':所有的配送方式,都保存在delivery_mode_arr中,点击的时候,判断,如果已经存在该配送方式,就删除,如果不存在,就保存
        chooseDelivery(delivery){
            var deliveryIndex = this.delivery_mode_arr.indexOf(delivery);
            if(deliveryIndex == -1){
                this.delivery_mode_arr.push(delivery);
            }else{
                this.delivery_mode_arr.splice(deliveryIndex,1)
            }
            this.delivery_mode = this.delivery_mode_arr.join(',');
        },
        // 点击"筛选"中的'商家属性'
        chooseAttrs(attr){
            var attrIndex = this.support_ids.indexOf(attr);
            if(attrIndex == -1){
                this.support_ids.push(attr);
            }else{
                this.support_ids.splice(attrIndex,1)
            }
        },
        // 点击"筛选"中的"确认"
        search(){
            this.searchSelected = !this.searchSelected;
            this.selected = ''
        },
         // 点击"筛选"中的"取消"
        clear(){
            this.delivery_mode_arr = [];
            this.support_ids = [];
        },
        // 选择排序方式
        selectSortType(id){
            this.selectSortTypeId = id;
            this.selected = '';
        },
    },
    computed:{
        ...mapState(['latitude','longitude'])
    }
}
</script>
<style lang="scss" scoped>
.navbar_container{
    top: 90px;
    width: 100%;
    background-color: #f1f1f1;
    position: fixed;
    /* height: 700px; */
    z-index: 11;
}
.category_container{
    background-color: #fff;
    font-size: 25px;
}
.category_container li{
    list-style: none;
    display: flex;
}
.category_left,.category_right{
    width: 100%;
    box-sizing: border-box;
    text-align: left;
}
.category_left{
    background-color: #f1f1f1;

}
.category_left>div{
    position: relative;
    padding: 20px;
}
.icon{
    width: 40px;
    display: inline-block;
    vertical-align: middle;
}
.name,.sub_name,.sub_count{
    margin-left: 30px;
    color: #666;
}

.count{
    background-color: #ccc;
    border: 1px solid #ccc;
    color: #fff;
    border-radius: 10px;
    margin-left: 40px;
    padding: 5px;
}
.category_left>div::after{
    content:'';
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(../../assets/img/right_arrow.png) no-repeat;
    background-size: contain;
    position: absolute;
    right: 10px;
    top: 10px;
}
.category_right{
    margin: 0 20px;
    overflow: auto;
    height: 700px;


}
.category_right li {
    border-bottom : 1px solid #e4e4e4;
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
}
.activeClass1{
    background-color: #fff;
}
.activeClass2>span{
    color: #3190e8 !important;
}
.delivery_attr_container{
    font-size: 25px;
    color: #333;
    background-color: #fff;
}
.delivery_title{
    text-align: left;
    padding: 20px 0;
}
.attr_title{
    text-align: left;
    margin: 20px 0;
}
.each_delivery,.each_atrr{
    border: 1px solid #eee;
    padding: 20px;
    margin: 10px;
    width: 180px;
    text-align: left;
    
}
.each_delivery img,.each_atrr img{
    width: 40px;
    vertical-align: middle;
    display: inline-block;
    margin-right: 20px;
}
.delivery_container,.attr_container{
    display: flex;
    flex-wrap: wrap;
}
.btns{
    margin-bottom: 20px;
}
.btns>span{
    font-size: 40px;
    width: 200px;
    display: inline-block;
    border-radius: 10px;
    padding: 10px 50px;
    margin: 0 20px;
}
.clear{
    background-color: #fff;
    color: #333;
    border: 1px solid #fff;
}
.confirm{
    background-color: #56d176;
    border: 1px solid #56d176;
    color: #fff;
}
.back_cover{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
}
.shop_list{
    margin-top: 180px;
    background-color: #fff;
}

.sort_container{
    background: #fff;
    color: #666;
    font-size: 20px;
}
.sortType{
    position: relative;
}
.sortType>img{
    width: 45px;
    display: inline-block;
    vertical-align: middle;
}

.sortType>span{
    display: inline-block;
    width: 80%;
    text-align: left;
    border-bottom: 1px solid #e4e4e4;
    padding: 40px 20px;
    margin-left: 10px;

}
.is_selected{
    position: absolute;
    top: 30px;
    right: 30px
}
</style>