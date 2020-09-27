<template>
    <div class="vipcard">
        <common-head :headData=headData>
            <template>我的积分</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="pointsBox">
            <div>
                <div>
                    <span>当前积分</span>
                    <router-link :to="{path:'/points/detail'}" tag="span">积分说明</router-link>
                </div>
                <div>
                    <span>0</span>
                    <span>分</span>
                </div>
                <div>
                    <span>积分兑换商品</span>
                </div>
            </div>
        </section>
        <section class="list">
            <div>最近30天积分记录</div>
            <div>
                <div>
                    <img :src="noRecordIcon"/>
                </div>
                <span>最近30天无积分纪录</span>
                <span>快去下单赚取大量积分吧</span>
            </div>
        </section>
        <router-view></router-view>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import noRecordIcon from '../../assets/img/noRecord.png'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            noRecordIcon,
        }
    },
    components:{
        commonHead,
    }
}
</script>
<style lang="scss" scoped>
.vipcard{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
}
.pointsBox{
    margin-top: 92px;
    font-size: 30px;
    color: #666;
    background-color: #3190e8;
    padding: 10px;
}
.pointsBox>div{
    background-color: #fff;
    padding: 20px;
}
.pointsBox>div>div:nth-child(1){
    display: flex;
    justify-content: space-between;
}
.pointsBox>div>div:nth-child(1)>span:nth-child(2){
    color: #3190e8;
    font-weight: bolder;
    position: relative;
}
.pointsBox>div>div:nth-child(1)>span:nth-child(2)::before{
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('../../assets/img/wenhao.png') no-repeat;
    background-size: contain;
    position: absolute;
    left: -30px;
    top: 9px;
}
.pointsBox>div>div:nth-child(2){
    text-align: left;
}

.pointsBox>div>div:nth-child(2)>span:nth-child(1){
    font-size: 100px;
    font-weight: bolder;
    margin-right: 20px;
    color: #333;
}
.pointsBox>div>div:nth-child(3)>span{
    display: inline-block;
    width: 90%;
    background-color: #fe6d47;
    color: #fff;
    border-radius: 20px;
    padding: 30px;
    font-size: 35px;
}
.list{
    font-size: 30px;
    color: #999;
}
.list>div:nth-child(1){
    text-align: left;
    padding: 20px;
}
.list>div>span{
    display: inline-block;
    width: 100%;
    text-align: center;
}
.list>div>div{
    display: inline-block;
    width: 100%;
    margin: 0 auto;
    text-align: center;
}
img{
    width: 50%;
}
</style>