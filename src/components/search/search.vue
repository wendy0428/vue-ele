<template>
    <div class="search">
        <common-head :headData=headData>
            <template>搜索</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="count_info">
        </section>
        <!-- 公共的底部 Tabber 组件 -->
        <tabbar :selectedTab="selectedTab"></tabbar>
    </div>
</template>
<script>
import { getStore } from '../../config/utils'
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const tabbar = () => import('@/components/common/tabbar')

import {getOrderList} from '../../service/getData'
export default {
    data(){
        return{
            headData:{
                goBack: true,
            },
            orderList: [], // 订单列表
            offset: 10,
            selectedTab:'搜索',
        }
    },
    created(){
        this.initData();
    },
    methods:{
        async initData(){
            this.orderList = await getOrderList(getStore('user_id'),this.offset).then((res)=>{
                return res;
            })
        }
    },
    components:{
        commonHead,
        tabbar
    }
}
</script>
<style scoped>
.search{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
}

</style>