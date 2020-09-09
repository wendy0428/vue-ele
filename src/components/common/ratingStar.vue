<template>
    <div id="ratingStar">
        <ul>
            <li v-for="(star,index) in stars" :key="index">
                <!-- 左半边星星为亮的原则是: 小数点后一位>=5的时候,就显示亮 -->
                <img :src="index<=parseInt(rating)?brightLeft:ashLeft" v-if="takeOneDecimal"/>
                <img :src="index<parseInt(rating)?brightLeft:ashLeft" v-else/>
                <!-- 右半边星星 -->
                <img :src="index<parseInt(rating)?brightRight:ashRight"/>
            </li>
        </ul>
    </div>
</template>
<script>
import brightLeft from '../../assets/img/sl.png'
import brightRight from '../../assets/img/sr.png'
import ashLeft from '../../assets/img/al.png'
import ashRight from '../../assets/img/ar.png'
export default {
    data(){
        return {
            stars : [true,true,true,true,true],
            brightLeft,
            brightRight,
            ashLeft,
            ashRight
        }
    },
    props:{
        rating: Number
    },
    computed:{
        takeOneDecimal(){
            return this.rating.toFixed(1).toString().replace(/\d+\.(\d*)/,'$1');
        }
    }
}
</script>
<style scoped>
#ratingStar ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
#ratingStar ul{
    display: flex;
}
#ratingStar ul li{
    line-height: 15px;;
}
img{
    width: 15px;
}
</style>