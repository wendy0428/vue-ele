<template>
    <div id="food">
        <common-head :headData=headData>
            <template v-if="title">{{title}}</template>
        </common-head>
        <section class="navbar_container">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1" @click.native="changeClassify">{{classify?title:'排序'}}</mt-tab-item>
                <mt-tab-item id="2">排序</mt-tab-item>
                <mt-tab-item id="3">筛选</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <!--  :title="eachCategory" -->
            <mt-tab-container v-model="selected">
              <mt-tab-container-item id="1" class="category_container">
                <li>
                    <div class="category_left">
                        <div v-for="(eachCategory,categoryIndex) in foodCategory" :key="categoryIndex" @click="changeCategory(eachCategory.id,eachCategory.sub_categories)" :class="restaurant_category_id==eachCategory.id ?'activeClass1':''">
                            <img :src="'https://fuss10.elemecdn.com/'+eachCategory.image_url" class="icon"/>
                            <span class="name">{{eachCategory.name}}</span>
                            <span class="count">{{eachCategory.count}}</span>
                        </div>
                    </div>
                    <div class="category_right" v-if="subCategories.length!=0">
                        <li v-for="(subCategory,subCategoryIndex) in subCategories" :key="subCategoryIndex" @click="changeFoodType(subCategory.id,subCategory.name)" :class="restaurant_category_ids ==subCategory.id ?'activeClass2':''">
                            <span class="sub_name">{{subCategory.name}}</span>
                            <span class="sub_count">{{subCategory.count}}</span>
                        </li>
                    </div>

                </li>
              </mt-tab-container-item>
              <!-- <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :key="n"  :title="'测试 ' + n" />
              </mt-tab-container-item>
              <mt-tab-container-item id="3">
                <mt-cell v-for="n in deliveryModes" :key="n"  :title="'选项 ' + n" />
              </mt-tab-container-item> -->
            </mt-tab-container>
        </section>
        
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')

import {getMsiteAddress,getFoodCategory,getFoodDelivery,getShopAttribute} from '../../service/getData'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true
            },
            title:'',
            geograph:'',
            selected:'',
            activeIndex1: 0, // 控制 "分类 "中 的 左边分类的激活样式
            activeIndex2: 0, // 控制 "分类 "中 的 右边分类的激活样式
            classify: true,
            sortTypeList :[],
            foodCategory: [],
            subCategories: [],
            deliveryModes: [],
            shopAttribute:[],
            restaurant_category_id:'', // "分类 "中 的左边分类的 id
            restaurant_category_ids: '', // "分类 "中 的左边分类的 id

        }
    },
    components:{
        commonHead
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
            // 1. 防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
            if((!this.latitude)||(!this.longitude)){
                let msiteAddress = await getMsiteAddress(this.geograph).then((res) => {
                    return res;
                }).catch((err)=>{
                    this.$toast({
                        message: err,
                        position: 'center',
                        duration: 1000
                    })
                });
                this.RECORD_ADDRESS({latitude:msiteAddress.latitude,longitude:msiteAddress.longitude})
            };
            // 2. 分类
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
            console.log('this.subCategories',this.subCategories);
            // 3. 配送方式
            this.deliveryModes = await getFoodDelivery(this.latitude,this.longitude).then((res) => {
                return res;
            }).catch((err)=>{
                this.$toast({
                    message: err,
                    position: 'center',
                    duration: 1000
                })
            });
            // 4. 商家属性
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
        // 点击"分类"中的 左边分类 : ①当前选中添加 activeClass1 样式 ②切换右边分类中的对应的数据
        changeCategory(id,sub_categories){
            // this.activeIndex1 = index;
            this.restaurant_category_id = id;
            this.subCategories = sub_categories;
        },
        // 点击"分类"中的 右边分类: ①当前选中添加 activeClass2 样式 ②改变整体页面的 title
        changeFoodType(id,name){
            this.restaurant_category_ids = id;
            // this.activeIndex1 = index;
            this.title = name;
            // this.selected = ''

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
        show(){
           
        }
    },
    computed:{
        ...mapState(['latitude','longitude'])
    }
}
</script>
<style scoped>
.navbar_container{
    margin-top: 90px;
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
</style>