<template>
    <div class="editAddress"> 
        <common-head :headData=headData>
            <template>编辑地址</template>
            <template v-slot:headRight>
               <span class="select_nav" v-if="deleteBol" @click="selectAddress">编辑</span>
               <span class="select_nav" v-else  @click="selectAddress">完成</span>
            </template>
        </common-head>
        <section class="addressListBox">
            <ul v-if="addressList&&addressList.length!=0">
                <li v-for="(address,addressIndex) in addressList" :key="addressIndex" :class="addressIndex==0?'actice_bg':''">
                    <div>{{address.address}}</div>
                    <div>{{address.phone}}</div>
                    <img :src="deleteIcon" @click="deleteThisAddress(address.id,addressIndex)" v-if="!deleteBol"/>
                </li>
            </ul>
        </section>
        <section class="addressBox">
            <router-link :to="{path:'/profile/info/address/add'}" tag="div">
                <span>新增地址</span>
            </router-link>
        </section>
        <!-- 新增地址 -->
        <router-view></router-view>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {getAddressList,deleteAddress} from '../../../../service/getData'
import {mapState,mapMutations} from 'vuex'
import {getStore} from '../../../../config/utils'
import deleteIcon from '../../../../assets/img/cha.png'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            addressList: [],
            deleteBol: true,
            deleteIcon,
        }
    },
    created(){
        this.initData();
    },
    methods:{
        ...mapMutations(['GET_ADDRESS','ADD_ADDRESS','DELETE_ADDRESS']),
        async initData(){
            console.log('allAddressList',this.allAddressList);
            let _this = this;
            // 获取增加过的地址列表
            _this.addressList = await getAddressList(getStore('user_id')).then((res) =>{
                if(res.length!=0){
                    // 保存获取到的地址列表到vuex 中
                    _this.GET_ADDRESS(res);
                    return res;
                }
            })

        },
        selectAddress(){
            this.deleteBol = !this.deleteBol;
        },
        deleteThisAddress(address_id,addressIndex){
            deleteAddress(getStore('user_id'),address_id).then((res) => {
                if(res.status == 1){
                    this.$toast({
                        message: res.success,
                        position: 'center',
                        duration: 1000
                    })
                    this.DELETE_ADDRESS(addressIndex);
                }
            }).catch((err) => {
                this.$toast({
                    message: err,
                    position: 'center',
                    duration: 1000
                })
            })

        }
    },
    computed:{
        ...mapState(['userInfo','allAddressList']),
    },
    watch:{
        '$route': 'initData' //解决从 'add 新增地址'返回 'address 编辑地址',页面数据不刷新的问题
    },
    components:{
        commonHead,
    }
}
</script>
<style lang="scss" scoped>
.editAddress{
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: #f2f2f2;
    z-index: 12;
}
.addressListBox{
    margin-top: 90px;
}
.addressBox{
    background: #fff;
    margin-top: 30px;
}
.addressBox>div>span{
    display: inline-block;
    width: 100%;
    height: 60px;
    padding: 20px;
    font-size: 35px;
    color: #333;
    text-align: left;
    margin-top: 20px;
    position: relative;
}
.addressBox>div>span::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 40px;
    top: 25%;
}

.addressListBox>ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    background: #fff;
}
.addressListBox>ul>li{
    border-bottom: 1px solid #d9d9d9;
    text-align: left;
    padding: 20px;
    position: relative;
}
.addressListBox>ul>li>img{
    width: 35px;
    position: absolute;
    right:20px;
    top: 35%;
}
.actice_bg{
    background-color: #FFF8C3;
}
.head_right .select_nav{
    right: -40px;
}
</style>