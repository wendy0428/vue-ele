<template>
    <div class="remark">
        <common-head :headData=headData>
            <template>请选择发票抬头</template>
             <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="invoice_box">
            <div>
                <span>不需要开发票</span>
                <img :src="checkedIcon" v-if="needInvoice" @click="changeChoice"/>
                <img :src="unCheckedIcon" v-else @click="changeChoice"/>
            </div>
        </section>
        <section class="login_btn">
            <span @click="confirm">确定</span>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import checkedIcon from '../../../assets/img/checked.png'
import unCheckedIcon from '../../../assets/img/unchecked.png'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            checkedIcon,
            unCheckedIcon,
            needInvoice: false,
        }
    },
    methods:{
        changeChoice(){
            this.needInvoice = !this.needInvoice;
        },
        // 确定
        confirm(){
            this.$emit('sendInvoice',this.needInvoice);
            this.$router.go(-1);
        }
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.remark{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f5f5f5;
    z-index: 11;
}
.invoice_box{
    margin-top: 100px;
    background-color: #fff;
}
.invoice_box>div{
    font-size: 35px;
    color: #333;
    text-align: left;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.invoice_box>div img{
    width: 8%;
    vertical-align: middle;
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