<template>
    <div id="CommonshopList">
        <ul v-if="list.length!=0">
            <router-link :to="{}" tag="li"
            v-for="(shop,shopIndex) in list" :key="shopIndex"
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
                        <span>{{shop.distance}}公里/<span>{{shop.order_lead_time}}</span></span>
                    </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
// 公共域名
import {imgBaseUrl} from '../../config/env'
// 引入评分组件
const ratingStar = () => import('@/components/common/ratingStar')
export default {
    data(){
        return {}
    },
    components:{
        ratingStar
    },
    props:{
        list: Array
    },
    methods:{
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
        }

    },
    computed:{
    }
}
</script>
<style scoped>
.box_left{
    width: 30%;
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
</style>