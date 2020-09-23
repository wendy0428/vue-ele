<template>
    <div class="alertTip_container">
        <div class="alertTip">
            <div class="alert_img">
                <img :src="warnIcon" class="warnImg"/>
            </div>
            <div class="alert_text">
                <span>{{alertText}}</span>
            </div>
            <div class="confirm_btn" @click="closeAlertTip">
                <span>确认</span>
            </div>
        </div>
    </div>
</template>
<script>
import warnIcon from '../../assets/img/warn.png'
export default {
    data(){
        return {
            warnIcon,
        }
    },
    methods:{
        closeAlertTip(){
            this.$emit('closeAlertTip');
        }
    },
    props:{
        alertText: String,
        alertStatus: Boolean
    },
}
</script>
<style scoped>
.alertTip_container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.alertTip{
    width: 80%;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ededed;
    border-radius: 20px;
}
.alertTip>div{
    width: 100%;
}
.alert_img{
    padding: 50px 0;
}
.alertTip>div>img{
    width: 30%;
}
.alert_text{
    color: #333;
    font-size: 30px;
    padding: 20px 0;
}
.confirm_btn{
    width: 100%;
}
.confirm_btn span{
    display: inline-block;
    width: 100%;
    border-radius: 20px;
    background-color: #4cd964;
    color: #fff;
    font-size: 40px;
    padding: 20px 40px;
    box-sizing: border-box;
}
</style>