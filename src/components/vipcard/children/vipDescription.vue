<template>
    <div class="vipDescription">
        <common-head :headData=headData>
            <template>我的优惠</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="description">
            <p>尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化：
              购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。
              注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。</p>
            <ul>
                <li>
                    <span>Q1: 特权介绍</span>
                    <ul>
                        <li>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</li>
                        <li>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</li>
                        <li>更多特权，敬请期待！</li>
                    </ul>
                </li>
                <li>
                    <span>Q2: 资费介绍</span>
                    <ul>
                        <li>饿了么会员卡：20元</li>
                    </ul>
                </li>
                <li>
                    <span>Q3: 使用说明</span>
                    <ul>
                        <li>当用户满足以下任一条件，会员服务自动失效：</li>
                        <li>自绑定之日起超过31天；</li>
                        <li>在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</li>
                    </ul>
                </li>
                <li>
                    <span>Q4: 购卡说明</span>
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
<style lang="scss" scoped>
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