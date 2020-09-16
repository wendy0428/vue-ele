<template>
    <div class="shopSafe">
        <common-head :headData=headData>
            <template>食品监督安全公示</template>
        </common-head>
        <section class="publicity">
            <div class="publicity_title">
                <span>食品监督安全公示</span>
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
                <span>工商登记信息</span>
            </div>
            <div>企业名称:<span>{{shopDetails.identification.company_name}}</span></div>
            <div>工商执照注册号:<span>{{shopDetails.identification.identificate_agency}}</span></div>
            <div>注册资本:<span>{{shopDetails.identification.registered_number}}</span></div>
            <div>注册地址:<span>{{shopDetails.identification.registered_address}}</span></div>
            <div>属地监管所:<span>{{shopDetails.identification.registered_principal}}</span></div>
            <div>法定代表人:<span>{{shopDetails.identification.legal_person}}</span></div>
            <div>经营范围:<span>{{shopDetails.identification.operation_period}}</span></div>
        </section>
        <section class="licence">
            <div>
                <span>餐饮许可证</span>
            </div>
            <div>营业范围:<span>{{shopDetails.identification.operation_period}}</span></div>
            <div>许可证有效期:<span>{{shopDetails.identification.licenses_date}}</span></div>
            <div>许可证号:<span>{{shopDetails.identification.licenses_number}}</span></div>
            <div>发证时间:<span>{{shopDetails.identification.licenses_scope}}</span></div>
            <div>发证机关:<span>{{shopDetails.identification.registered_principal}}</span></div>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import smileIcon from '../../../../assets/img/xiaolian.png'
import sadIcon from '../../../../assets/img/kulian.png'
export default {
    data(){
        return {
            headData:{
                goBack: true
            },
            smileIcon,
            sadIcon
        }
    },
    created(){
        // 商家详情
        let shopDetails = this.$route.query.shopDetails
        this.shopDetails = JSON.parse(shopDetails);
    },
    components:{
        commonHead
    }
}
</script>
<style scoped>
.shopSafe{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color:#ebebeb;
    z-index: 23;
}
.publicity{
    margin-top: 90px;
}
.publicity,.info,.licence{
    margin-bottom: 30px;
    background-color: #fff;
    padding: 20px;
    text-align: left;
}
.publicity>div,.info>div,.licence>div{
    padding: 20px;
}
.publicity>div:nth-child(1),.info>div:nth-child(1),.licence>div:nth-child(1){
    border-bottom: 1px solid #f1f1f1;
    padding: 20px 10px;

}
.publicity>div>span,.info>div>span{
    color: #333;
    font-size: 35px;
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
</style>