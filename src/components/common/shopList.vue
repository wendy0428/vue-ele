<template>
    <div id="CommonshopList">
        <ul v-if="list.length!=0">
            <router-link :to="{}" tag="li"
            v-for="(shop,shopIndex) in list" :key="shopIndex"
            >
                <div class="box_left">
                    <img :src="'http://cangdu.org:8001/img/'+shop.image_path"/>
                </div>
                <div class="box_right">
                    <!-- 第一行 -->
                    <div class="box_right_top">
                        <div class="box_right_top_name">
                            <span>品牌</span>
                            <span>shop.name</span>
                        </div>
                        <div class="box_right_top_icon_name" v-if="shop.supports&&shop.supports.length!=0">
                            <li v-for="(icon,iconIndex) in shop.supports" :key="iconIndex">
                                {{icon.icon_name}}
                            </li>
                        </div>
                    </div>
                    <!-- 第二行 -->
                    <div class="box_right_mid">
                        <div class="box_right_mid_rating">
                            <rating-star :rating="shop.rating"></rating-star>
                            <span>{{shop.rating}}</span>
                            <span>月售{{shop.recent_order_num}}单</span>
                        </div>
                        <div class="box_right_mid_delivery_mode">

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

    }
}
</script>
<style scoped>

</style>