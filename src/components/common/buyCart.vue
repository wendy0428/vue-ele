<template>
    <div class="buyCart">
        <section v-if="food.specfoods.length == 1" class="has_one_specfood">
            <img 
                :src="reduceIco" 
                @click="removeOutCart(
                    food.category_id,
                    food.item_id,
                    food.specfoods[0].food_id,
                    food.specfoods[0].name,
                    food.specfoods[0].price,
                    food.specfoods[0].specs,
                    food.specfoods[0].packing_fee,
                    food.specfoods[0].sku_id,
                    food.specfoods[0].stock)
                " 
                v-if="foodNum>0"
            />           
            <span v-if="foodNum>0">{{foodNum}}</span>
            <img 
                :src="addIco" 
                @click="addToCart(food.category_id,food.item_id,food.specfoods[0].food_id,food.specfoods[0].name,food.specfoods[0].price,food.specfoods[0].specs,food.specfoods[0].packing_fee,food.specfoods[0].sku_id,food.specfoods[0].stock)"
            />
        </section>
        <section v-else class="has_more_specfood">
            <span @click="sendSpecs(food)">选规格</span>
        </section>
    </div>
</template>
<script>
import addIco from '../../assets/img/add.png'
import reduceIco from '../../assets/img/reduce.png'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            addIco,
            reduceIco
        }
    },
    methods:{
        ...mapMutations(['ADD_CART','REDUCE_CART']),
        // 加入购物车
        addToCart(category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock){
            this.ADD_CART({shopid:this.shopid,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock})
            console.log('shopid:',this.shopid,'category_id:',category_id,'item_id:',item_id,'food_id:',food_id,'name:',name,'price:',price,'specs:',specs,'packing_fee:',packing_fee,'sku_id:',sku_id,'stock:',stock);
        },
        // 移除购物车
        removeOutCart(category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock){
            this.REDUCE_CART({shopid:this.shopid,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock});
        },
        // 选择规格,子组件buyCart向父组件传值
        sendSpecs(){
            this.$emit('getSpecs',this.food);
        },
    },
    computed:{
        ...mapState(['cartList']),
        // 监听 当前 shopid 商品,在购物车列表 cartList 的变化
        shopCart(){
            if(this.shopid){
                return Object.assign({},this.cartList[this.shopid]);
            }
        },
        // 计算当前 cartList[shopid:'商铺 id'][category_id:'食品分类 id'][item_id:'当前食品'] ; 当前食品还有具体的规格是根据[food_id]去区分的,所以需要遍历,计算总数.
        foodNum(){
            let _this = this;
            let total_num = 0;
            let shopCart = Object.assign({},this.shopCart);
            let category_id = this.food.category_id;
            let item_id = this.food.item_id;
            if(shopCart[category_id]!=undefined&&shopCart[category_id][item_id]!=undefined){
                if(shopCart[category_id][item_id]!=undefined){
                    let food_id = this.food.specfoods[0].food_id;
                    let total_num = this.shopCart[category_id][item_id][food_id];
                    if(total_num!=undefined){
                        total_num = this.shopCart[category_id][item_id][food_id].num;
                        return total_num;
                    }
                }
            }
            return total_num;
        }
    },
    props:{
        shopid:[Number,String],
        food: Object,
    }
}
</script>
<style lang="scss" scoped>
.buyCart{
    font-size: 20px;
}

.buyCart section img{
    width: 30px;
    display: inline-block;
    vertical-align: middle;
}

.has_one_specfood span{
    padding: 0 10px;
}

.has_more_specfood span{
    display: inline-block;
    width: 80px;
    height: 40px;
    color: #fff;
    background-color: #3190e8;
    border: 1px solid #3190e8;
    border-radius: 10px;
    font-size: 16px;
}

</style>