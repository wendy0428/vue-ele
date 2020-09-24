<template>
    <div class="download">
        <common-head :headData=headData>
            <template>下载</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <div class="box">
            <div>
                <img :src="eleIco"/>
            </div>
            <div class="download_btn" @click="goDownLoad">
                <span>下载</span>
            </div>
        </div>
        <alert-tip :alertText="alertText"  @closeAlertTip="closeAlertTip" v-if="alertStatus"></alert-tip>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
const alertTip = () => import('@/components/common/alertTip')
import eleIco from '../../assets/img/ele.png'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            eleIco,
            alertText: '',
            alertStatus:false,
        }   
    },
    methods:{
        goDownLoad(){
            this.alertStatus = true;
            this.alertText = '该功能还在开发中...';
        },
        closeAlertTip(){
            this.alertStatus = false;
        }
    },
    components:{
        commonHead,
        alertTip
    }
}
</script>
<style scoped>
.download{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #FFF;
    z-index: 11;
}
.box{
    margin-top: 90px;
    
}
.box>div:nth-child(1){
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 50px;
}
.box>div:nth-child(1) img{
    width: 30%;
}
.download_btn {
    margin-top: 50px;
}

.download_btn span{
    display: inline-block;
    width: 80%;
    border-radius: 20px;
    background-color: #4cd964;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
}

</style>