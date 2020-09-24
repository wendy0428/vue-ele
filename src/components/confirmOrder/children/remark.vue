<template>
    <div class="remark">
        <common-head :headData=headData>
            <template>订单备注</template>
             <template v-slot:headRight>
               <span></span>
            </template>
        </common-head>
        <section class="remarks_box">
            <div>快速备注</div>
            <ul v-if="remarks.length!=0" class="ul1">
                <li v-for="(remarkType,remarkTypeIndex) in remarks" :key="remarkTypeIndex">
                    <ul class="ul2">
                        <li v-for="(remark,remarkIndex) in remarkType" :key="remarkIndex" @click="chooseRemark(remarkTypeIndex,remark,remarkIndex)" :class="choosedRemark[remarkTypeIndex]&&choosedRemark[remarkTypeIndex][remarkIndex]==remark?'active':''">
                            <span>{{remark}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <section class="other_remarks_box">
            <div>其他备注</div>
            <textarea id="input_remarks" placeholder="请输入备注内容(可不填)" v-model="inputValue"></textarea>
        </section>
        <section class="login_btn">
            <span @click="confirm">确定</span>
        </section>
    </div>
</template>
<script>
import { ratingScores } from '../../../../../vue45/src/service/getData'
// 公共头部组件
const commonHead = () => import('@/components/header/head')
import {getRemark} from '../../../service/getData'
export default {
    data(){
        return {
            headData:{
                goBack: true,
            },
            id: '',
            sig: '',
            remarks: [],
            choosed:{},
            choosedRemark: {},
            inputValue: '',
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.sig = this.$route.query.sig;
        this.initData();
    },
    methods:{
        async initData(){
            this.remarks = await getRemark(this.id,this.sig).then((res) => {
                return res.remarks;
            })
        },
        // 选择快速备注
        chooseRemark(type,remark,index){
            // console.log('类型:',type,'文案:',remark,'文案 index:',index);
            let obj = {};
            obj[index] = remark;
            if(this.choosed[type] == undefined){
                this.choosed[type] = obj;
            }else{
                if(this.choosed[type][index] == undefined){
                    this.choosed[type] = obj;
                }else{
                    this.choosed[type] = {};
                }
            }
            this.choosedRemark = Object.assign({},this.choosed);
        },
        // 确定
        confirm(){
            console.log('this.choosedRemark ',this.choosedRemark );
            var str = '';
            for(let key in this.choosedRemark){
                if(this.choosedRemark[key]){
                    for(let index in this.choosedRemark[key]){
                        str += `${this.choosedRemark[key][index]},`
                    }
                }
            }
            if(this.inputValue){
                str +=`${this.inputValue}`
            }
            this.$emit('sendRemark',str);
            this.$router.go(-1);
        }
    },
    components:{
        commonHead,
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
.remarks_box{
    margin-top: 90px;
    background-color: #fff;
}
.remarks_box>div,.other_remarks_box>div{
    font-size: 35px;
    color: #333;
    text-align: left;
    padding: 10px 20px;
}
.remarks_box ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
    color: #333;
    display: flex;
    
}
.ul1{
    display: flex;
    flex-wrap: wrap;
}
.ul1>li{
   border: 1px solid #3190e8; 
   border-radius: 10px;
   margin: 20px;
}
.ul2>li{
    padding: 10px 20px;
}

.ul2>li:nth-child(even){
    border-left: 1px solid #3190e8;
    border-right: 1px solid #3190e8;
}
.ul2>li:last-child{
    border-right: 0 ;
}
.active{
    color: #fff !important;
    background-color: #3190e8 !important;
}
.other_remarks_box{
    background-color: #fff;
    margin-top: 20px;
    padding-bottom: 40px;
}
#input_remarks{
    width: 90%;
    height: 200px;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 10px;
    outline: 0;
    resize: none;
    padding: 10px;
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