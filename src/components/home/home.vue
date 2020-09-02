<template>
    <div id="home">
        <common-head></common-head>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {cityGuess} from '../../service/getDate'
export default {
    data(){
        return {}
    },
    components:{
        commonHead
    },
    created(){
        let city = cityGuess().then((res)=>{
            console.log('res',res);
        })
     
    }
}
</script>
<style scoped>

</style>