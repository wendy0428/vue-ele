<template>
    <div id="shop">
        <section class="shop_header" :style="background" v-if="shopDetails.image_path">
            <div class="shop_header_left">
                <img :src="'http://cangdu.org:8001/img/'+shopDetails.image_path"/>
            </div>
            <div class="shop_header_right">
                <span class="name">{{shopDetails.name}}</span>
                <span class="info">商家配送/{{shopDetails.order_lead_time}}/配送费{{shopDetails.float_delivery_fee}}</span>
                <span class="promotion">公告{{shopDetails.promotion_info}}</span>
            </div>
        </section>
        <section class="menu">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1" class="select_title">商品</mt-tab-item>
                <mt-tab-item id="2" class="select_title">评价</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <!-- 商品 -->
              <mt-tab-container-item id="1">
                <mt-cell v-for="n in 10" :title="'内容 ' + n" />
              </mt-tab-container-item>
              <!-- 评价 -->
              <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" />
              </mt-tab-container-item>
           
            </mt-tab-container>
        </section>
    </div>
</template>
<script>
import {getMsiteAddress,getShopDetails} from '../../service/getData'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            geograph:'', // 当前商铺的地理信息
            id: '', // 当前商铺的 id
            shopDetails:'', //当前商铺详情
            selected: "1",
        }
    },
    created(){
        this.geograph = this.$route.query.geograph;
        this.id = this.$route.query.id;
        this.initData();
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS']),
        async initData(){
            let _this = this;
            // 1. 防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
            if((!_this.latitude)||(!_this.longitude)){
                let msiteAddress = await getMsiteAddress(_this.geograph).then((res) => {
                    return res;
                }).catch((err)=>{
                    _this.$toast({
                        message: err,
                        position: 'center',
                        duration: 1000
                    })
                });
                _this.RECORD_ADDRESS({latitude:msiteAddress.latitude,longitude:msiteAddress.longitude})
            };
            // 2. 获取当前商铺详情
            getShopDetails(_this.id,_this.latitude,_this.longitude).then((res)=>{
                this.shopDetails = res;
            }).catch((err)=>{
                _this.$toast({
                    message: err,
                    position: 'center',
                    duration: 1000
                })
            });

        }
    },
    computed:{
        ...mapState(['longitude','latitude']),
        // 动态的设置头部的背景图片
        background(){
            return {
                backgroundImage: `url(http://cangdu.org:8001/img/${this.shopDetails.image_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center,center'
            }
        }
    }
}
</script>
<style scoped>
.shop_header{
    width: 100%;
    height: 200px;
    background-color: rgba(119, 103, 137, 0.43);
    /* 背景图片的上面再去叠加一层背景颜色 */
    background-blend-mode: multiply; 
    font-size: 25px;
    color: #fff;
    display: flex;
    position: fixed;
    top: 0;
}
.shop_header_left{
    width: 30%;
    position: relative;
}
.shop_header_left img{
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.shop_header_right{
    width: 70%;
}
.shop_header_right>span{
    display: block;
    text-align: left;
    margin-top: 15px;
}
.shop_header_right .name{
    font-size: 35px;
}   

.menu{
    position: fixed;
    top: 200px;
    width: 100%;
}
.select_title .mint-tab-item-label{
    font-size: 35px;
}
</style>