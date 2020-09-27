<template>
    <div class="foodDetail">
        <common-head :headData=headData>
            <template v-if="food">{{food.name}}</template>
        </common-head>
        <section class="food_img">
            <img :src="'http://cangdu.org:8001/img/'+food.image_path"/>
        </section>
        <section class="food_desc">
                <div class="food_name">
                    <span class="name">{{food.name}}</span>
                </div>
                <div class="food_description">
                    <span>{{food.description}}</span>
                </div>
                <div class="shop_date">
                    <span v-if="food.month_sales">月售{{food.month_sales}}</span>
                    <span v-if="food.satisfy_rate">好评率{{food.satisfy_rate}}%</span>
                </div>
                <div class="rating" v-if="food.rating">
                    <rating-star :rating="food.rating" class="rating_star"></rating-star>
                    <span>{{food.rating.toFixed(1)}}</span>
                </div>
                <div v-if="food.activity&&food.activity.image_text" class="activity">
                    <span>{{food.activity.image_text}}</span>
                </div>
                <div class="price">
                    <div><span>¥{{food.specfoods[0].price}}&nbsp;&nbsp;</span>起</div>
                </div>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import ratingStar from '../../../components/common/ratingStar'
export default{
    data(){
        return {
            headData:{
                goBack: true,
            },
            food: {},
        }
    },
    created(){
        this.food = JSON.parse(this.$route.query.food);
        console.log('food',this.food);
    },
    components:{
        commonHead,
        ratingStar
    }
}
</script>
<style lang="scss" scoped>
.foodDetail{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 25;
    font-size: 30px;
}
.food_img{
    width: 100%;
    height: 500px;
    margin-top: 90px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ededed
}
.food_desc{
    padding-left: 40px;
    border-bottom: 1px solid #ededed
}
.food_desc>div{
    margin-bottom: 20px;
}
.food_img img{
    width: 60%;
}
.food_name{
    font-weight: bold;
    text-align: left;
}

.food_description{
    color: #999;
    font-size: 20px;
    text-align: left;
}
.shop_date{
    color: #333;
    font-size: 25px;
    text-align: left;
}

.shop_date>span{
    margin-right: 20px;
}
.activity{
    text-align: left;
}
.activity>span{
    display: inline-block;
    color: rgb(241, 136, 79);
    border: 1px solid rgb(240, 115, 115);
    font-size: 20px;
    border-radius: 10px;
}
.price {
    text-align: left;
}
.price span:nth-child(1){
    color: #f60;
    font-weight: bold;
}
.rating{
    display: flex;
}
.rating span{
    padding-left: 20px;
    color: #f60;
    font-weight: bold;
}
</style>