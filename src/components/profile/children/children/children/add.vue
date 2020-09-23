<template>
    <div class="edit"> 
        <common-head :headData=headData>
            <template>新增地址</template>
            <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="editBox">
           <input type="text" v-model="userName" placeholder="请填写你的姓名" autocomplete="false"/>
           <input type="text" v-model="address" placeholder="小区/写字楼/学校等" autocomplete="false" readonly @click="goToAddDetailPage"/>
           <input type="text" v-model="addressDetail" placeholder="请填写详情送餐地址" autocomplete="false"/>
           <input type="number" v-model="phone" placeholder="请填写能够联系到您的手机号" autocomplete="false"/>
           <input type="number" v-model="sparePhone" placeholder="备用联系电话(选填)" autocomplete="false"/>
        </section>
        <section class="add_btn">
            <span @click="addNewAddress">新增地址</span>
        </section>
        <!-- 搜索地址  -->
        <router-view @selectedAddress="selectedAddress"></router-view>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {addAddress} from '../../../../../service/getData'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            userName: '', // 收货姓名
            address: '', // 收获地址
            addressDetail: '', // 收获详细地址
            phone: '', // 手机号码
            sparePhone: '', //备用手机号码
        }
    },
    methods:{
        ...mapMutations(['ADD_ADDRESS']),
        // 跳转到搜索地址页面
        goToAddDetailPage(){
            this.$router.push({path:'/profile/info/address/add/addDetail'})
        },
        // 接收 addDetail 子视图传过来的选中地址
        selectedAddress(address){
            this.address = address;
        },
        // 新增地址
        addNewAddress(){
            addAddress(this.userInfo.user_id, this.addressDetail, this.address, this.geograph, this.userName, this.phone, this.sparePhone, 0, 1, '公司', 4).then((res) => {
                if(res.status == 1){
                    this.$toast({
                        message: res.success,
                        position: 'center',
                        duration: 1000
                    });
                    var address = {
                        address: this.addressDetail,
                        address_detail:this.address,
                        geohash: this.geograph,
                        name: this.userName,
                        phone: this.phone,
                        phone_bk: this.sparePhone,
                        poi_type: 0,
                        sex: 1,
                        tag: "公司",
                        tag_type: 4,
                    }
                    // 保存新增的地址到 vuex 中的 addressList 中
                    this.ADD_ADDRESS(address);
                    // 回到新增地址列表页面
                    this.$router.push({path:'/profile/info/address'});
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
        ...mapState(['userInfo','geograph']),
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.edit{
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: #f2f2f2;
    z-index: 13;
}
.editBox{
    margin-top: 90px;
    background-color: #fff;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.editBox>input{
    width: 90%;
    padding: 20px;
    outline: 0;
    border: 1px solid #ddd;
    border-radius: 10px;
    color: #333;
    background-color: #f2f2f2; 
    font-size: 30px;
}
.add_btn span{
    display: inline-block;
    width: 80%;
    border-radius: 20px;
    background-color: #4cd964;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
}

</style>