<template>
    <div class="remark">
        <common-head :headData=headData>
            <template>选择地址</template>
             <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="addressList_box">
            <ul v-if="addressList.length!=0">
                <li v-for="(addr,addrIndex) in addressList" :key="addrIndex">
                    <div class="box_left">
                        <img :src="selectedIndex==addrIndex?checkedIcon:unCheckedIcon" @click="changeAddress(addr,addrIndex)"/>
                    </div>
                    <div class="box_right">
                        <div>
                            <span class="address">{{addr.address}}</span>
                            <span class="sex">{{addr.sex == 1?'先生':'女士'}}</span>
                            <span class="phone">{{addr.phone}}</span>
                        </div>
                        <div>
                            <span class="tag">{{addr.tag}}</span>
                            <span class="address_detail">{{addr.address_detail}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="addNewAddress">
            <router-link :to="{path:'/confirmOrder/chooseAddress/addAddress'}" tag="div">
                <img :src="addIcon"/>
                <span>新增收货地址</span>
            </router-link >
        </section>
        <!-- 添加地址 -->
        <router-view></router-view>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')

import {getAddressList} from '../../../service/getData'

import {getStore} from '../../../config/utils'

import {mapMutations} from 'vuex'
import checkedIcon from '../../../assets/img/checked.png'
import unCheckedIcon from '../../../assets/img/unchecked.png'
import addIcon from '../../../assets/img/add.png'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            checkedIcon,
            unCheckedIcon,
            addIcon,
            id: '',
            sig: '',
            user_id: '', // 用户名
            addressList: [],
            needInvoice: false,
            selectedIndex: 0,
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.sig = this.$route.query.sig;
        this.user_id = getStore('user_id');
        this.initData();
    },
    methods:{
        ...mapMutations(['CHOOSE_ADDRESS']),
        async initData(){
            this.addressList = await getAddressList(this.user_id).then((res) => {
                return res;
            });
        },
        changeAddress(address,index){
            this.selectedIndex = index;
            this.CHOOSE_ADDRESS({address,index});
            this.$router.go(-1);
        }
    },
    components:{
        commonHead,
    },
    watch:{

        '$route':'initData'
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
.addressList_box{
    margin-top: 90px;
    background-color: #fff;
}
.addressList_box ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.addressList_box ul li{
    display: flex;
    border-bottom: 1px solid #ededed;
}
.box_left{
    width: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.box_left img {
    width: 30%;
}
.box_right{
    width: 80%;
    text-align: left;
}
.box_right .address{
    font-size: 40px;
    font-weight: bold;
}
.sex,.phone{
    color: #333;
    font-size: 35px;
    padding-left: 10px;
}
.tag{
    background-color: rgb(76, 217, 100);
    color: #fff;
    font-size: 25px;
    padding:5px;
    border-radius: 10px ;
}
.address_detail{
    font-size: 25px;
    color: #777;
    padding-left: 10px;

}
.addNewAddress{
    position: fixed;
    bottom: 20px;
    font-size: 35px;
    color: #3190e8;
    width: 100%;
}
.addNewAddress>div{
    text-align: center;
}
.addNewAddress img{
    width: 50px;
    vertical-align: middle;
    margin-right: 20px;
}
</style>