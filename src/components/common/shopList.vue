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
                        <rating-star :rating="rating"></rating-star>
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
import ratingStar from './ratingStar'
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