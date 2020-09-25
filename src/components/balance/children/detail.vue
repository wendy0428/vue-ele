<template>
    <div class="vipDescription">
        <common-head :headData=headData>
            <template>余额说明</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="description">
            <ul>
                <li>
                    <span>Q1: 使用余额的条件</span>
                    <ul>
                        <li>在线支付的订单将获得订单积分奖励：</li>
                        <li>可获得积分=订单金额×10（即1元=10点积分）。</li>
                        <li>订单金额指实际付款金额，不包含活动优惠金额。</li>
                    </ul>
                </li>
                <li>
                    <span>Q2: 余额可以怎么用？</span>
                    <ul>
                        <li>饿了么会员卡：20元</li>
                    </ul>
                </li>
                <li>
                    <span>Q3:我要如何提现？</span>
                    <ul>
                        <li>当用户满足以下任一条件，会员服务自动失效：</li>
                        <li>自绑定之日起超过31天；</li>
                        <li>在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</li>
                    </ul>
                </li>
                <li>
                    <span>Q4:为什么会提现失败？</span>
                    <ul>
                        <li>在线购买：饿了么App>我的>饿了么会员卡</li>
                    </ul>
                </li>
                <li>
                    <span>Q5: 温馨提示</span>
                    <ul>
                        <li>用户在当前会员服务失效前，无法购买新卡。</li>
                        <li>请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。</li>
                    </ul>
                </li>
            </ul>
        </section>
        <!-- 会员说明 -->
        <router-view></router-view>
    </div>
</template>
<script>

// 公共头部组件
const commonHead = () => import('@/components/header/head')

import {mapState} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
        }
    },
    created(){
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.vipDescription{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
}
.description{
    margin-top: 90px;
    font-size: 30px;
    color: #666;
}
.description>p{
    text-indent: 2px;
}
.description ul{
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
}
.description ul span{
    font-weight: bold;
    color: #333;
    font-size: 35px;
}
.description>ul>li{
    padding: 20px;
}
</style>