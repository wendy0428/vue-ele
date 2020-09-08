<template>
    <div id="msite">
        <common-head>
            <template>
                {{msiteAddress}}
            </template>
            <template v-slot:search>
                <img :src="searchIco"/>
            </template>
        </common-head>
        <mt-swipe :auto="4000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
// 图标
import searchIco from '../../assets/img/search.png'
// 接口
import {getMsiteAddress,getMsiteFoodTypes} from '../../service/getData'
export default {
    data(){
        return {
            searchIco,
            latitude:'',
            longitude: '',
            geograph: '',
            msiteAddress: '',
            swipeList : [],
        }
    },
    components:{
        commonHead
    },
    created(){
        this.latitude = this.$route.query.latitude;
        this.longitude = this.$route.query.longitude;
        this.geograph = this.latitude + ','+this.longitude ;
        // 1. 获取当前地址
        getMsiteAddress(this.geograph).then((res) => {
            let name = res.name;
            this.msiteAddress = name;
        }).catch((err) => {
            this.$toast({
                message: err,
                position: "center",
                duration: 1000
            });
        });
        // 2.获取轮播图的食品分类
        getMsiteFoodTypes(this.geograph).then((res) => {
            this.swipeList = res;
        }).catch((err) => {
            this.$toast({
                message: err,
                position: "center",
                duration: 1000
            });
        });
    }
}
</script>
<style scoped>

</style>