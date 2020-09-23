<template>
    <div class="setUserName"> 
        <common-head :headData=headData>
            <template>修改用户名</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="inputBox">
            <input type="text" v-model="newUserName" placeholder="输入用户名" autocomplete="false" @input="checkOut" :class="addActiveBol?'warn':''"/>
            <div>用户名只能修改一次(5-24字符之间)</div>
        </section>
        <section class="confirm_btn">
            <span :class="activeConfirm?'':'btn_opacity'"  @click="confirmEdit">确认修改</span>
        </section>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            newUserName: '', // 新的用户名
            addActiveBol: false, // 用户名输入框添加样式
            activeConfirm: false, // 控制点击按钮
        }
    },
    methods:{
        ...mapMutations(['RETSET_NAME']),
        // 验证输入用户名,是否在5-24之间
        checkOut(){
            let len = this.newUserName.length;
            if(len<5||len>24){
                this.addActiveBol = true;
                this.activeConfirm = false;
            }else{
                this.addActiveBol = false;
                this.activeConfirm = true;
            }
        },
        // 提交修改的用户名,这里没有真正意义上的修改用户名,只是修改了保存到 vuex 的 userInfo 的用户信息
        confirmEdit(){
            if(!this.activeConfirm){
                return;
            }
            this.RETSET_NAME(this.newUserName);
            this.$router.go(-1);
        }
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.setUserName{
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: #fff;
    z-index: 12;
}
.inputBox{
    margin-top: 90px;
}
.inputBox>input{
    width: 90%;
    padding: 30px 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 30px;
    outline: none;
}
.inputBox>div{
    font-size: 25px;
    color: #666;
    text-align: left;
    margin-top: 30px;
    padding-left: 30px;
}
.warn{
    border: 1px solid #ea3106 !important;
}
.confirm_btn span{
    display: inline-block;
    width: 80%;
    border-radius: 20px;
    background-color: #4cd964;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
}
.btn_opacity{
    opacity: 0.6;
}
</style>