<template>
  <div class="container">
      <div class="white">
          <div>
              <sn-icon :type="icon" color="#0078FF" size="80" />
              <p class="title">{{company}}</p>
          </div>
          <template v-if="type===1">
              <p class="bdtn">
                  <span>可用余额</span>
                  <span>
              <span>￥</span>
              <span>86,974</span>
          </span>
              </p>
              <p>
                  <span>今日曝光量</span>
                  <span>2,000</span>
              </p>
              <p>
                  <span>昨日曝光量</span>
                  <span>1,561,561</span>
              </p>
              <p>
                  <span>最近7天平均曝光量</span>
                  <span>54,968,126</span>
              </p>
              <p>
                  <span>正在投放广告(个)</span>
                  <span>2</span>
              </p>
              <div class="h70"></div>
              <div class="btn-box">
                  <sn-button type="primary"
                             size="stretch-h36"
                             ghost>
                      <sn-icon type="open" color="#2A9FF6" size="12" class="open-icon"/> 创建广告
                  </sn-button>
                  <sn-button type="primary"  size="stretch-h36" ghost class="w100">{{btnName}}</sn-button>
                  <sn-button type="primary" class="primary">进入</sn-button>
              </div>
          </template>
          <template v-else-if="type==2">
              <div class="mt80">
                  <sn-icon type="tips" color="rgba(223,226,229,1)" size="40" />
                  <p class="tip">尚未权限</p>
                  <p class="tip-sub" v-if="company=='广点通'">请联系您的广告销售</p>
              </div>
          </template>
          <template v-else-if="type==3">
              <div>
                  <sn-button type="primary">点击开通</sn-button>
              </div>
          </template>
          <template v-else-if="type==4">
              <div>审核中</div>
          </template>
      </div>
  </div>
</template>

<script>
    import {Icon,Button} from "_c"
    const components={
        'sn-icon':Icon,
        'sn-button':Button,
    };
    export default {
        name: "card",
        components,
        props:{
            company:String,
            icon:{
                type:String,
                default:'flow-analysis'
            },
            btnName:{
                type:String,
                default:'转入'
            },
            type:{
                type:Number,
                default:1
            },
        }
    }
</script>

<style scoped lang="less">
    .white{
        background-color: #fff;
        height: 100%;
        box-sizing: border-box;
        padding: 60px 50px;
        display: flex;
        flex-direction: column;
        &>p,&>div{
            text-align: center;
        }
        &>p{
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(241,242,244,1);
            border-top: 1px solid rgba(241,242,244,1);
        }
        .bdtn{
            border-top: none;
        }
        /deep/ .w100{
            width: 100px;
            margin: 0 20px;
        }
        .btn-box{
            margin: 0 -30px;
        }
        .h70{
            height: 70px;
        }
    }
    .title{
        margin-top: 20px;
        margin-bottom: 55px;
        font-size:18px;
        font-weight:400;
        color:rgba(53,64,82,1);
        line-height: 1;
    }
    .tip{
        font-size:14px;
        font-weight:bold;
        color:rgba(53,64,82,1);
        line-height: 1;
        margin-top: 10px;
    }
    .tip-sub{
        font-size:14px;
        font-weight:400;
        color:rgba(127,143,164,1);
        line-height: 1;
        margin-top: 15px;
    }
    .mt80{
        margin-top: 80px;
    }
</style>
