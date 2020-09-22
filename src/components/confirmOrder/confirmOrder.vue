<template>
    <div class="confirmOrder">
        <common-head :headData=headData>
            <template>确认订单</template>
        </common-head>
        <section class="select_address">
            <div>
                <span class="add_address">请添加一个收货地址</span>
            </div>
        </section>
        <section class="delivery_desc">
            <span>送达时间</span>
            <div></div>
        </section>
    </div>
</template>
<script>
import {mapState,mapMutation} from 'vuex'
import {checkout} from '../../service/getData'
// 公共头部组件
const commonHead = () => import('@/components/header/head')

import addressBottomIcon from '../../assets/img/address_bottom.png'
import locationIcon from '../../assets/img/location.png'
import rightArrowIcon from '../../assets/img/right_arrow.png'
export default{
    data(){
        return{
            headData:{
                goBack: true,
            },
            addressBottomIcon,
            rightArrowIcon,
            geograph: '',
            shopid: '',
            shopCart: '',

        }
    },
    created(){
        // 地理位置
        this.geograph = this.$route.query.geograph;
        // 购物车中的商品
        this.shopCart = JSON.parse(this.$route.query.shopCart);
        // 商铺 ID
        this.shopid = this.$route.query.shopid;
        this.initData();
    },
    methods:{
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
            let res = await checkout(_this.geograph,[confirmOrderArr],_this.shopid);

        }
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
</style>