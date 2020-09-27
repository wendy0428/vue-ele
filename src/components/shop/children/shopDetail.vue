<template>
    <div class="shopDetail">
        <common-head :headData=headData>
            <template>商家详情</template>
        </common-head>
        <section class="attrs">
            <div>
                <span>活动与属性</span>
            </div>
            <ul v-if="shopDetails.supports&&shopDetails.supports.length!=0">
                <li v-for="(support,supportIndex) in shopDetails.supports" :key="supportIndex">
                    <span class="icon_name" :class="support.icon_name=='准'?'diff_background':''">{{support.icon_name}}</span>
                    <span class="description">{{support.description}}</span>
                </li>
            </ul>
        </section>
        <section class="publicity">
            <div class="publicity_title">
                <span>食品监督安全公示</span>
                <span @click="showShopSafe">企业认证信息</span>
            </div>
            <div class="publicity_container">
                <div class="publicity_left">
                    <img :src="smileIcon" v-if="shopDetails.status == 1"/>
                    <img :src="sadIcon" v-else/>
                </div>
                <div class="publicity_right">
                    <div>监督检测结果:<span :class="shopDetails.status == 1?'active_color':''">{{shopDetails.status == 1?'良好':'差'}}</span></div>
                    <div>检查日期:<span>{{shopDetails.identification.identificate_date}}</span></div>
                </div>
            </div>
        </section>
        <section class="info">
            <div>
                <span>商家信息</span>
            </div>
            <div>{{shopDetails.name}}</div>
            <div>地址:{{shopDetails.address}}</div>
            <div>营业时间:{{shopDetails.opening_hours[0]}}</div>
            <div @click="showLicense(shopDetails.license.business_license_image)">营业执照</div>
            <div @click="showLicense(shopDetails.license.catering_service_license_image)">餐饮服务许可证</div>
        </section>
        <section class="licenseContainer" v-if="showLicenseImg" @click="hideLicenseImg">
            <img :src="licenseImg"/>
        </section>
        <!-- 食品监督安全公示 页面 -->
        <router-view></router-view>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')

import smileIcon from '../../../assets/img/xiaolian.png'
import sadIcon from '../../../assets/img/kulian.png'
export default {
    data(){
        return {
            smileIcon,
            sadIcon,
            headData:{
                goBack: true
            },
            shopDetails:'',
            licenseImg:'http://elm.cangdu.org/img/default.jpg',
            showLicenseImg:false,
        }
    },
    created(){
        // 商家详情
        let shopDetails = this.$route.query.shopDetails
        this.shopDetails = JSON.parse(shopDetails);
    },
    methods:{
        // 跳转食品监督安全公示
        showShopSafe(){
            this.$router.push({path:'/shop/shopDetail/shopSafe',query:{shopDetails:JSON.stringify(this.shopDetails)}});
        },
        // 展示 营业执照 餐饮服务许可证
        showLicense(img){
            this.showLicenseImg = true;
            if(img){
                this.licenseImg = img;
            }
        },
        // 隐藏 营业执照 餐饮服务许可证
        hideLicenseImg(){
            this.showLicenseImg = false;
        }

    },
    components:{
        commonHead
    }
}
</script>
<style lang="scss" scoped>
.shopDetail,.licenseContainer{
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: #ebebeb;
    z-index:22;
    font-size: 25px;
    color: #666;
}
.attrs{
    margin-top: 90px;
}
.attrs,.publicity,.info{
    margin-bottom: 30px;
    background-color: #fff;
    padding: 20px;
    text-align: left;
}
.attrs>div,.publicity>div:nth-child(1),.info>div{
    border-bottom: 1px solid #f1f1f1;
    padding: 20px 10px;

}
.attrs>div>span,.publicity>div>span,.info>div>span{
    color: #333;
    font-size: 35px;
}
.attrs ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.attrs ul li{
    margin: 40px;
}
.icon_name{
    display: inline-block;
    color: #fff;
    background-color: #999;
    padding: 5px;
    margin-right: 10px;
}
.diff_background{
    background-color: rgb(87, 169, 255);
}
.publicity_title{
    display: flex;
    justify-content: space-between;
}
.publicity>div>span:nth-child(2){
    color: #BBB;
    padding-right: 20px;
    position: relative;
}
.publicity>div>span:nth-child(2)::after{
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(../../../assets/img/right_arrow.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 6px;
}
.publicity>.publicity_container{
    display: flex;
    padding: 40px 0;
}
.publicity>.publicity_container>.publicity_left{
    width: 25%;
    position: relative;
}
.publicity>.publicity_container>.publicity_left img{
    width:50%;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
    
}
.publicity>.publicity_container>.publicity_right{
    width: 75%;
}
.publicity>.publicity_container>.publicity_right>div:nth-child(1)>span{
    padding-left: 20px;
    font-weight: bold;
}
.publicity>.publicity_container>.publicity_right>div{
    margin: 20px 0;
}
.active_color{
    color: #7ed321;
}
.info{
    font-size: 30px;
}
.info>div:last-child::after,.info>div:nth-child(5)::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(../../../assets/img/right_arrow.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 30px;
    right:5px;
}
.info>div:last-child{
    border: 0;
    position: relative;
}
.info>div:nth-child(5){
    position: relative;
}
.info>div{
    padding: 30px 0;
}
</style>