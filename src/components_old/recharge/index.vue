<template>
    <sn-modal
            :footer-hide="true"
            v-model="isShow"
            class-name="vertical-center-modal"
            width="750"
            @on-visible-change="visibleChange"
    >
        <div class="dialog-box">
            <div class="dialog-title">快速充值</div>
            <div class="mt50 ml90">
                <div class="flex money">
                    <div class="label">充值金额</div>
                    <div class="money-box ml0 money-box-active">2,000元</div>
                    <div class="money-box">3,000元</div>
                    <div class="money-box">6,000元</div>
                    <div class="money-box">10,000元</div>
                    <div class="money-box">20,000元</div>
                </div>
                <div class="flex">
                    <div class="label">其他金额</div>
                    <sn-input size="large" class="input" placeholder="输入金额" type="number"/>
                </div>
                <div class="flex way">
                    <div class="label h50">支付方式</div>
                    <div class="way-box ml0" :class="[typeActive===1?'way-box-active':'']" @click="type=typeChange(1)">
                        <sn-icon type="alipay" color="#2A9FF6" size="26" class="icon" />
                        支付宝
                    </div>
                    <div class="way-box" @click="typeChange(2)" :class="[typeActive===2?'way-box-active':'']">
                        <sn-icon type="alipay" color="#2A9FF6" size="26" class="icon" />
                        微信
                    </div>
                    <div class="way-box" @click="typeChange(3)" :class="[typeActive===3?'way-box-active':'']">
                        <sn-icon type="alipay" color="#2A9FF6" size="26" class="icon" />
                        银联
                    </div>
                </div>
                <div class="mt80"><span>2000.00</span><span>元</span></div>
                <template v-if="typeActive!==2">
                    <div class="dialog-btn">
                        <sn-button type="primary" shape="circle"  size="stretch">立即充值</sn-button>
                    </div>
                </template>
                <template v-else>
                    <div class="dialog-img">
                        <img src="data:image/png;base64,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" alt="">
                    </div>
                    <p class="tip-1">请使用微信“扫一扫”完成支付</p>
                    <p class="tip-2">付款码将在 <span>30分钟 </span>后失效</p>
                </template>
            </div>
        </div>
    </sn-modal>
</template>

<script >
    import {Input,Icon,Button} from "_c"
    import {Modal} from 'iview'
    const components={
        'sn-modal':Modal,
        'sn-input':Input,
        'sn-icon':Icon,
        'sn-button':Button,
    };
    export default {
        props:{
            visible:{type:Boolean}
        },
        name: "recharge",
        components,
        methods:{
            visibleChange(val){
                (!val)&&this.$emit('visibleChange', val);
            },
            typeChange(val){
                this.typeActive=val;
            }
        },
        data(){
           return{
               isShow:false,
               typeActive:1
           }
        },
        watch:{
            visible:{
                handler(val) {
                    this.isShow=val;
                },
                immediate: true
            }
        }
    }
</script>

<style scoped lang="less">
    /*弹窗部分*/
    /deep/ .ivu-modal-body{
        padding: 20px;
    }

    .dialog-title{
        height:16px;
        font-size:16px;
        font-weight:bold;
        color:rgba(53,64,82,1);
        line-height: 1;
        box-sizing: content-box;
    }
    .mt50{
        margin-top: 50px;
    }
    .ml90{
        margin-left: 90px;
    }
    .flex{
        display: flex;
        margin-top: 35px;
    .label{
        width:70px;
        height: 36px;
        line-height: 36px;
        text-align: right;
        font-size:14px;
        font-weight:400;
        color:rgba(127,143,164,1);
        margin-right: 20px;
    }
    &:first-child{
         margin-top: 0;
     }
    .money-box{
        width:80px;
        height:34px;
        background:rgba(237,239,242,1);
        border:1px solid rgba(223, 226, 230, 1);
        border-radius:2px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:14px;
        font-weight:400;
        color:rgba(74,82,98,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .money-box-active{
        background:#2A9FF6;
        color:rgba(255,255,255,1);
    }
    .ml0{
        margin-left: 0!important;
    }
    .input{
        width: 360px;
    }
    .way-box{
        width:120px;
        height:50px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(223, 226, 230, 1);
        border-radius:2px;
        margin-left: 20px;

        font-size:14px;
        font-weight:400;
        color:rgba(53,64,82,1);

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

    .icon{
        margin-right: 17px;
    }
    }
    .way-box-active{
        border:1px solid rgba(3, 201, 2, 1);
        position: relative;
    &:after{
         content: '';
         display: inline-block;
         width: 0;
         height: 0;
         border-bottom: 28px solid rgba(3, 201, 2, 1);
         border-left: 28px solid transparent;
         position: absolute;
         right: 0;
         bottom: 0;
         z-index: 20;
     }
    &:before{
         content: '';
         display: inline-block;
         width: 12px;
         height: 7px;
         border-bottom: 2px solid #fff;
         border-left: 2px solid #fff;
         position: absolute;
         right: 2px;
         bottom: 6px;
         z-index: 21;
         transform: rotate(-45deg);
     }
    }
    }

    .dialog-box{
        .mt80{
            margin-left: -90px;
            margin-top: 80px;
            font-size:20px;
            font-weight:bold;
            color:rgba(42,159,246,1);
            line-height: 1;
            text-align: center;
        &:last-child{
             font-size: 14px;
         }
        }
        .dialog-img{
            margin-left: -90px;
            margin-top: 10px;
            text-align: center;
        img{
            width:194px;
            height:194px;
        }
        }
        .tip-1{
            margin-left: -90px;
            margin-top: 20px;
            font-size:14px;
            font-weight:400;
            color:rgba(42,159,246,1);
            line-height: 1;
            text-align: center;
        }
        .tip-2{
            margin-left: -90px;
            text-align: center;
            font-size:14px;
            font-weight:400;
            color:rgba(127,143,164,1);
            line-height:1;
            margin-top: 10px;
            margin-bottom: 36px;
        span{
            font-weight: Bold;
        }
        }
        .dialog-btn{
            margin-left: -90px;
            margin-top: 60px;
            text-align: center;
            margin-bottom: 202px;
        }
    }
    /deep/ .s-btn-stretch.s-btn-circle{
        border-radius: 30px;
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
    }
    .vertical-center-modal .dialog-box .h50{
        height: 50px;
        line-height: 50px;
    }

    /*弹窗部分*/
</style>
