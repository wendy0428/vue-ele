<template>
    <div class="confirmOrder">
        <common-head :headData=headData>
            <template>确认订单</template>
        </common-head>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
export default{
    data(){
        return{
            headData:{
                goBack: true,
            },
        }
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>


</style>