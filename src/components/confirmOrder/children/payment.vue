<template>
    <div class="payment">
        <common-head :headData=headData>
            <template>在线支付</template>
             <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="countdown">
            <div>支付剩余时间</div>
            <div>
                <span>00</span>
                <span class="divide">:</span>
                <span>{{minuteCom}}</span>
                <span class="divide">:</span>
                <span>{{secondCom}}</span>
            </div>
        </section>
        <section class="payType">
            <div class="payType_title">选择支付方式</div>
            <div class="choosePayType">
                <div class="zhifubao" @click="changeType(1)">
                    <span>支付宝</span>
                    <img :src="type==1?checkedIcon:uncheckedIcon"/>
                </div>
                <div class="weixin" @click="changeType(2)">
                    <span>微信</span>
                    <img :src="type==2?checkedIcon:uncheckedIcon"/>
                </div>
            </div>
        </section>
        <section class="login_btn">
            <span>确定支付</span>
        </section>
        <alert-tip :alertText="alertText" v-if="alertStatus" @closeAlertTip="closeAlertTip"></alert-tip>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const alertTip = () => import('@/components/common/alertTip')
import {payRequest} from '../../../service/getData'
import {mapState} from 'vuex'
import { getStore } from '../../../config/utils'
import checkedIcon from '../../../assets/img/checked.png'
import uncheckedIcon from '../../../assets/img/unchecked.png'
import zhifubaoIcon from '../../../assets/img/zhifubao.png'
import weixinIcon from '../../../assets/img/weixin.png'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            checkedIcon,
            uncheckedIcon,
            zhifubaoIcon,
            weixinIcon,
            user_id: '',
            minute: 14,
            second :59,
            alertText: '支付超时',
            alertStatus: false,
            timer: '',
            type: 1,

        }
    },
    created(){
        this.user_id = getStore('user_id');
        this.initData();
    },
    methods:{
        async initData(){
            payRequest(this.orderMessage.order_id,this.user_id).then((res) => {
                if(res.status == 0){
                    this.$toast({
                        message: res.message,
                        position: 'center',
                        duration: 5000
                    })
                }
            });
            this.countDown();
        },
        countDown(){
            let _this = this;
            _this.timer = setInterval(function(){ _this.countDownTimer() },1000);
        },
        countDownTimer (){
            if( this.minute == 0 && this.second == 0 ){
                this.alertStatus = true;
                clearInterval(this.timer);
                return;
            }else if( this.minute >= 0 ){
                if( this.second > 0 ){
                    this.second--;
                }else if( this.second == 0 ){
                    this.minute--;

                    this.second = 59;
                }
            }
        },
        closeAlertTip(){
            this.alertStatus = false;
        },
        changeType(val){
            this.type = val;
        }
    },
    computed:{
        ...mapState(['orderMessage']),
        minuteCom(){
            return this.minute<10?`0${this.minute}`:this.minute;
        },
        secondCom(){
            return this.second<10?`0${this.second}`:this.second;
        }
    },
    components:{
        commonHead,
        alertTip
    }
}
</script>
<style lang="scss" scoped>
.payment{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f5f5f5;
    z-index: 11;
}
.countdown{
    margin-top: 90px;
    background-color: #fff;
    padding-bottom: 70px;
}

.countdown>div:nth-child(1){
    color: #666;
    font-size: 20px;
    padding-top: 60px;
    padding-bottom: 20px;
}
.divide{
    padding: 0 20px; 
}
.payType_title{
    color: #666;
    background-color: #f1f1f1;
    font-size: 35px;
    text-align: left;
    padding: 20px 30px;
}
.choosePayType{
    background-color: #fff;
}
.zhifubao{
    border-bottom: 1px solid #ededed;
}
.zhifubao,.weixin{
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    color: #666;
    padding: 30px;
}
.zhifubao img,.weixin img{
    width: 50px;
}
.zhifubao>span,.weixin>span{
    position: relative;
    padding-left: 70px;
}   
.zhifubao>span::before{
    content: '';
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url('../../../assets/img/zhifubao.png') no-repeat;
    background-size: contain;
    position: absolute;
    left: 0px;
    top: -10px;
}
.weixin>span::before{
    content: '';
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url('../../../assets/img/weixin.png') no-repeat;
    background-size: contain;
    position: absolute;
    left: 0px;
    top: -10px;
}

.login_btn{
    margin-top: 50px;
}
.login_btn span{
    display: inline-block;
    width: 80%;
    border-radius: 20px;
    background-color: #4cd964;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
}
</style>