<template>
    <div class="addAddress">
        <common-head :headData=headData>
            <template>添加地址</template>
             <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="addressList_box">
            <div class="person">
                <span class="person_title">联系人</span>
                <div class="person_info">
                    <div>
                        <input type="text" placeholder="你的名字" autocomplete="false" class="person_name"/>
                    </div>
                    <div class="choose_sex">
                        <div>
                            <img :src="sexStatus==1?checkedIcon:uncheckedIcon"/><span>先生</span>
                        </div>
                        <div>
                            <img :src="sexStatus==0?checkedIcon:uncheckedIcon"/><span>女士</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="person">
                <span class="person_title">联系电话</span>
                <div class="person_info">
                    <div>
                        <input type="number" placeholder="你的手机号" autocomplete="false" class="person_name"/>
                    </div>
                    <div class="choose_sex">
                        <input type="number" placeholder="你的备用号" autocomplete="false" class="person_name"/>
                    </div>
                </div>
            </div>
            <div class="person">
                <span class="person_title">送餐地址</span>
                <div class="person_info">
                    <div>
                        <input type="text" placeholder="小区/写字楼/学校等" autocomplete="false" class="person_name" readonly/>
                    </div>
                    <div class="choose_sex">
                        <input type="text" placeholder="详细地址(如门牌号等)" autocomplete="false" class="person_name"/>
                    </div>
                </div>
            </div>
            <div class="person">
                <span class="person_title">标签</span>
                <div class="person_info">
                    <div>
                        <input type="text" placeholder="无/家/学校/公司" autocomplete="false" class="person_name" readonly/>
                    </div>
                </div>
            </div>
        </section>
        <section class="login_btn">
            <span>确定</span>
        </section>
        <!-- 添加地址 -->
        <router-view></router-view>
    </div>
</template>
<script>
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {mapMutations} from 'vuex'
import checkedIcon from '../../../../assets/img/checked.png'
import uncheckedIcon from '../../../../assets/img/unchecked.png'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            uncheckedIcon,
            checkedIcon,
            sexStatus:0,
      
        }
    },
    methods:{
        
    },
    components:{
        commonHead,
    }
}
</script>
<style scoped>
.addAddress{
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
    font-size: 30px;
    color: #333;
}
.person{
    display: flex;
    padding: 20px 20px;
    border-bottom: 1px solid #ededed;

}
.person_title{
    display: inline-block;
    width: 30%;
    text-align: left;
}
.person_info{
    width: 70%;
}
.person_info>div:nth-child(1){
    border-bottom: 1px solid #ededed;
}

.person_name{
    width: 80%;
    padding: 20px;
    outline: 0;
    border:0;
    font-size: 35px;
    color: #999;
}
.choose_sex{
    display: flex;
    padding: 20px;
}
.choose_sex>div{
    width: 30%;
    margin-right: 20px;
}
.choose_sex img{
    width: 40px;
    vertical-align: middle;
    margin-right: 20px;
}
.login_btn{
    margin-top: 20px;
}
.login_btn span{
    display: inline-block;
    width: 80%;
    border-radius: 20px;
    background-color: #4cd964;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
}
</style>