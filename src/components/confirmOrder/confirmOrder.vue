<template>
    <div class="confirmOrder">
        <common-head :headData=headData>
            <template>确认订单</template>
        </common-head>
        <section class="select_address" v-if="orderInfo">
            <router-link :to="{path:'/confirmOrder/chooseAddress',query:{'id':orderInfo.id,'sig':orderInfo.sig}}" tag="div" >
                <span class="add_address" v-if="!choosedAddress">请添加一个收货地址</span>
                <div class="box_right add_address" v-else>
                    <div>
                        <span class="address">{{choosedAddress.address}}</span>
                        <span class="sex">{{choosedAddress.sex == 1?'先生':'女士'}}</span>
                        <span class="phone">{{choosedAddress.phone}}</span>
                    </div>
                    <div>
                        <span class="tag">{{choosedAddress.tag}}</span>
                        <span class="address_detail">{{choosedAddress.address_detail}}</span>
                    </div>
                </div>
            </router-link>
        </section>
        <section class="delivery_desc"  v-if="orderInfo">
            <div class="title">
                <span>送达时间</span>
            </div>
            <div>
                <div class="delivery_time">尽快送达|预计{{orderInfo.delivery_reach_time}}</div>
                <div class="delivery_desc_type" v-if="orderInfo.cart.is_deliver_by_fengniao"><span>蜂鸟配送</span></div>
            </div>
        </section>
        <section class="pay_type_container">
            <div class="title">
                <span class="pay_title">支付方式</span>
                <span class="pay_type" @click="showPayType">在线支付</span>
            </div>
            <div class="hongbao">
                <span class="hongbao_title">红包</span>
                <span class="hongbao_desc">暂时只在饿了么 APP 中支持</span>
            </div>
        </section>

        <!-- 下单信息 -->
        <section class="cart" v-if="orderInfo">
            <div class="cart_title">
                <img :src="'http://cangdu.org:8001/img/'+orderInfo.cart.restaurant_info.image_path"/>
                <span>效果显示</span>
            </div>
            <!-- 商品 -->
            <ul v-if="orderInfo.cart.groups.length!=0">
                <li v-for="(food,foodIntex) in orderInfo.cart.groups[0]" :key="foodIntex">
                    <span>{{food.name}}</span>
                    <span>x{{food.quantity}}</span>
                    <span>¥{{food.price}}</span>
                </li>
            </ul>
             <!-- 其他收费 -->
            <ul v-if="orderInfo.cart.extra.length!=0">
                <li v-for="(extra,extraIndex) in orderInfo.cart.extra" :key="extraIndex">
                    <span>{{extra.name}}</span>
                    <span>x{{extra.quantity}}</span>
                    <span>¥{{extra.price}}</span>
                </li>
            </ul>
            <!-- 配送费 -->
            <ul>
                <li>
                    <span>配送费</span>
                    <span></span>
                    <span>¥{{orderInfo.cart.deliver_amount||0}}</span>
                </li>
            </ul>

            <div class="cart_total">
                <span>订单¥{{orderInfo.cart.total}}</span>
                <span>待支付¥{{orderInfo.cart.total}}</span>
            </div>
        </section>
        <!-- 订单备注 和 发票抬头 -->
        <section class="other_info" v-if="orderInfo">
            <router-link :to="{path:'/confirmOrder/remark',query:{'id':orderInfo.id,'sig':orderInfo.sig}}" class="remark" tag="div">
                <span>订单备注</span>
                <span>{{remarks==''?'口味、偏好等':remarks}}</span>
            </router-link>
            <router-link :to="{path:'/confirmOrder/invoice'}" class="invoice" tag="div">
                <span>发票抬头</span>
                <span>{{needInvoices?'需要开发票':'不需要开发票'}}</span>
            </router-link>
        </section>

        <!-- 支付方式 -->
        <section class="select_box" v-if="showPayTypeStatus" @click="hidePayType">
            <div class="select_container" v-if="orderInfo.payments.length!=0">
                <p>支付方式</p>
                <ul>
                    <li v-for="(payType,payTypeIndex) in orderInfo.payments" :key="payTypeIndex">
                        <span :class="payType.is_online_payment?'active':'disActive'">{{payType.name}}{{payType.description}}</span>
                        <img :src="checkedIco" v-if="payType.is_online_payment"/>
                        <img :src="uncheckedIco" v-else/>
                    </li>
                </ul>
            </div>
        </section>
        <!-- 订单备注和发票抬头 -->
        <router-view @sendRemark="getRemark" @sendInvoice="getInvoice"></router-view>
    </div>
</template>
<script>
import {mapState,mapMutation, mapMutations} from 'vuex'
import {checkout,getAddressList} from '../../service/getData'
import {getStore} from '../../config/utils'
// 公共头部组件
const commonHead = () => import('@/components/header/head')

import addressBottomIcon from '../../assets/img/address_bottom.png'
import locationIcon from '../../assets/img/location.png'
import rightArrowIcon from '../../assets/img/right_arrow.png'
import checkedIco from '../../assets/img/checked.png'
import uncheckedIco from '../../assets/img/unchecked.png'
export default{
    data(){
        return{
            headData:{
                goBack: true,
            },
            addressBottomIcon,
            rightArrowIcon,
            checkedIco,
            uncheckedIco,
            geograph: '',
            user_id: '',
            shopid: '',
            shopCart: '',
            orderInfo: null, // 配送的相关信息
            showPayTypeStatus: false,
            remarks: '',
            needInvoices: false,
            addressList:[],
            // choosedAddress:null,

        }
    },
    created(){
        this.user_id = getStore('user_id');
        // 地理位置
        this.geograph = this.$route.query.geograph;
        // 购物车中的商品
        this.shopCart = JSON.parse(this.$route.query.shopCart);
        console.log('this.shopCart',this.shopCart);
        // 商铺 ID
        this.shopid = this.$route.query.shopid;
        this.initData();
    },
    methods:{
        ...mapMutations(['CHOOSE_ADDRESS']),
        async initData(){
            let _this = this;
            let confirmOrderArr = []
            for(let i=0;i<_this.shopCart.length;i++){
                let newObj = {};
                newObj['attrs'] = [];
                newObj['extra'] = {};
                newObj['id'] = _this.shopCart[i].id;
                newObj['name'] = _this.shopCart[i].name;
                newObj['packing_fee'] = _this.shopCart[i].packing_fee;
                newObj['price']= _this.shopCart[i].price;
                newObj['quantity']= _this.shopCart[i].num;
                newObj['sku_id'] = _this.shopCart[i].sku_id;
                newObj['specs'] = _this.shopCart[i].specs;
                newObj['stock'] = _this.shopCart[i].stock;
                confirmOrderArr.push(newObj);
            }
            // 获取订单信息
            _this.orderInfo = await checkout(_this.geograph,[confirmOrderArr],_this.shopid);

            // 初始化地址
            let addressList = await getAddressList(this.user_id).then((res) => {
                return res;
            })
            // this.choosedAddress = await getAddressList(this.user_id).then((res) => {
            //     return res[0];
            // })
            this.CHOOSE_ADDRESS({address:addressList[0],index:0});
        },
        // 展示支付方式
        showPayType(){
            this.showPayTypeStatus = true;
        },
        // 隐藏支付方式
        hidePayType(){
            this.showPayTypeStatus = false;
        },
        // 获得子视图传来的值
        getRemark(val){
            this.remarks = val;
        },
        // 获取子视图传来的值
        getInvoice(val){
            this.needInvoices = val;
        }
    },
    computed:{
        ...mapState(['choosedAddress']),
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.select_address{
    margin-top: 90px;
    background-color: #fff;
    text-align: left;
    border-bottom: 10px solid transparent;
    -moz-border-image:url('../../assets/img/address_bottom.png') 30 30 round;	/* Old Firefox */
    -webkit-border-image:url('../../assets/img/address_bottom.png') 30 30 round;	/* Safari and Chrome */
    -o-border-image:url('../../assets/img/address_bottom.png') 30 30 round;		/* Opera */
    border-image:url('../../assets/img/address_bottom.png') 10 10 round;
}

.select_address>div{
    padding: 40px 0px 40px 100px;
}
.add_address{
    font-size: 35px;
    color: #333;
    position: relative;
}
.add_address::before{
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('../../assets/img/location.png') no-repeat;
    background-size: contain;
    position: absolute;
    top: 0px;
    left: -50px;
}
.add_address::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    top: 0px;
    right: -300px;
}

/* 配送 */
.delivery_desc{
    display: flex; 
    background: #fff;
    padding: 20px 0;
    margin-top: 20px;
    border-left: 9px solid #3190e8;
}
.delivery_desc>div:nth-child(1){
    width: 40%;
    color: #333;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    justify-content:space-around;
    align-items: center;
}

.delivery_desc>div:nth-child(2){
    width: 60%;
    font-size: 35px;
}
.delivery_desc>div:nth-child(2)>div{
    margin: 20px;
    text-align: right;

}
.delivery_time{
    color: #3190e8;
}

.delivery_desc_type>span{
    display: inline-block;
    background-color: #3190e8;
    color: #fff;
    font-size: 30px;
    border-radius: 10px;
    padding: 5px 10px;
}
/* 支付 */
.pay_type_container{
    background: #fff;
    padding: 20px 20px;
    margin-top: 20px;
    color: #aaa;
    font-size: 30px;
}
.pay_type_container>div{
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
.pay_type_container>div .pay_title{
    color: #666;
}
.pay_type{
    padding-right: 30px;
    position: relative;
}
.pay_type::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    top: -3px;
}
.hongbao{
    border-top: 1px solid #ededed;
}
.select_box{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
}
.select_container{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: 80px;
}
.select_container>p{
    font-size: 40px;
}

.select_container>ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
}
.select_container>ul>li{
    display: flex;
    justify-content: space-between;
    padding: 30px;
}
.select_container>ul>li img{
    width: 40px;
}
.active{
    color: #333;
}
.disActive{
    color: #ccc;
}


/* 订单 */
.cart{
    background-color: #fff;
    margin-top: 20px;
}
.cart_title{
    font-size: 40px;
    border-bottom: 1px solid #ededed;
    text-align: left;
    padding: 20px 40px;
}
.cart_title img{
    width: 60px;
    margin-right: 20px;
    vertical-align: middle;
    color: #333;
}
.cart ul,.cart_total{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    color: #666;
}
.cart ul li{
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
}
.cart ul li span:nth-child(1){
    width: 50%;
    text-align: left;
}
.cart ul li span:nth-child(2){
    width: 30%;
    text-align: center;
    color: #f60;
}
.cart ul li span:nth-child(3){
    width: 20%;
    text-align: center;
}
.cart_total{
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ededed;
}
.cart_total>span:nth-child(2){
    color: #f60;
    font-weight: bold;
}
/* 订单备注和发票抬头 */
.other_info{
    background: #fff;
    margin-top: 20px;
    font-size: 30px;
    color: #666;
}
.other_info>div{
    display: flex;
    justify-content: space-between;
    padding: 30px 60px 30px 30px;
}
.remark{
    border-bottom: 1px solid #ededed;
}
.other_info>div>span:nth-child(2){
    position: relative;
}
.other_info>div>span:nth-child(2)::after{
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../../assets/img/right_arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    top: -3px;
}

.address{
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
</style>