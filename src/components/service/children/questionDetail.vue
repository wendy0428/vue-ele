<template>
    <div class="questionDetail">
        <common-head :headData=headData>
            <template>超级会员权益说明</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <div v-if="detail" class="detail_box">
            <p>{{detail}}</p>
        </div>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            detail:'',
        }   
    },
    created(){
        this.detail = this.$route.query.des;
    },
    components:{
        commonHead,
    }
}
</script>
<style lang="scss" scoped>
.questionDetail{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    z-index: 11;
    overflow: auto;
}
.detail_box{
    margin-top: 90px;
    font-size: 40px;
    
}

</style>