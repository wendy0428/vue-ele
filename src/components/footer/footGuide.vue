<template>
    <div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="外卖" @click.native="jumpTo" >
                <img slot="icon" :src="selected == '外卖' ? blueEleIcon :grayEleIcon">
                外卖
            </mt-tab-item>
            <mt-tab-item id="搜索" @click.native="jumpTo">
                <img slot="icon" :src="selected == '搜索' ? blueSearchIcon :graySearchIcon">
                搜索
            </mt-tab-item>
            <mt-tab-item id="订单" @click.native="jumpTo">
               <img slot="icon" :src="selected == '订单' ? blueOrderIcon :grayOrderIcon">
               订单
            </mt-tab-item>
            <mt-tab-item id="我的" @click.native="jumpTo">
               <img slot="icon" :src="selected == '我的' ? bluePersonIcon :grayPersonIcon">
               我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import blueEleIcon from '../../assets/img/blueEle.png'
import grayEleIcon from '../../assets/img/grayEle.png'
import blueSearchIcon from '../../assets/img/blueSearch.png'
import graySearchIcon from '../../assets/img/graySearch.png'
import blueOrderIcon from '../../assets/img/blueOrder.png'
import grayOrderIcon from '../../assets/img/grayOrder.png'
import bluePersonIcon from '../../assets/img/bluePerson.png'
import grayPersonIcon from '../../assets/img/grayPerson.png'
import {getStore} from '../../config/utils'
export default {
    data(){
        return {
            blueEleIcon,
            grayEleIcon,
            blueSearchIcon,
            graySearchIcon,
            blueOrderIcon,
            grayOrderIcon,
            bluePersonIcon,
            grayPersonIcon,
            selected:this.selectedTab,
            longitude: '',
            latitude: '',
        }
    },
    created(){
        this.longitude = getStore('longitude');
        this.latitude = getStore('latitude');
    },
    methods:{
        // 底部 Tabbar 切换不同的页面
        jumpTo(url){
            if(this.selected == '外卖'){
                this.$router.push({path: `/msite?latitude=${this.latitude}&longitude=${this.longitude}`})
            };
            if(this.selected == '搜索'){
                this.$router.push({path:'/search'})
            };
            if(this.selected == '订单'){
                this.$router.push({path:'/order'})
            };
            if(this.selected == '我的'){
                this.$router.push({path:'/profile'})
            };
        }
    },
    props:{
        selectedTab: String
    }
}
</script>