<template>
  <sn-layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <div class="h30"></div>
    <div class="s-content-top">
      <div class="f-card">
        <financial-card :Balance="'45,876.45'"
                        :freeze="'2,653.23'"
                        type="dsp"
                        @withdraw="withdraw"></financial-card>
      </div>
      <div>
        <money-card
              money="10,055.55" icon="balance" iconColor="#7ACE4C" :border="false"
              title="今日已消费"></money-card>
      </div>
      <div>
        <money-card
                money="31,100.50" icon="balance" iconColor="#7ACE4C" :border="false"
                title="昨日总消费"></money-card>
      </div>
      <div>
        <money-card
                money="3,555,500.50" icon="balance" iconColor="#7ACE4C" :border="false"
                title="最近7日总消费"></money-card>
      </div>
    </div>
    <div class="h30"></div>
    <div class="main-card-box">
      <main-card class="main-card" company="深度传媒"></main-card>
      <main-card class="main-card" company="微信" btnName="充值" :type="4"></main-card>
      <main-card class="main-card" company="广点通" :type="2"></main-card>
    </div>
  </sn-layout>
</template>
<script>
import {FinancialCard,moneyCard} from "_c"
import { mapState } from 'vuex'
import { Layout} from 'iview'
import mainCard from './card'







export default {
  name:'advertiserIndex',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile','mediaTypes','userinfo'
    ]),
  },
  components: {
    'financial-card':FinancialCard,
    'money-card':moneyCard,
    'sn-layout':Layout,
    'main-card':mainCard,
  },
  methods: {
      getQuery() {
          return { }
      },
      withdraw(){

      }
  },
  created(){
  },
  watch:{
  },
  mounted() {

  },
}
</script>
<style lang="less" scoped>
/*顶部样式*/
.s-content-top{
  height: 200px;
  margin: 0 30px ;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: center;
  &>div{
    flex: 0 1 422px;
    overflow: hidden;
    padding:0 15px;
    box-sizing: border-box;
    &:first-child{
      flex: 0 1 422px;
      overflow: hidden;
      padding:0 30px 0 0;
      box-sizing: border-box;
      transform: translate(20px, -25px);
    }
    &:last-child{
      flex: 0 1 422px;
      overflow: hidden;
      padding:0  0 0 30px;
      box-sizing: border-box;
    }
  }
}
/*顶部样式*/
.main-card-box{
    flex: 1;
    display: flex;
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
    overflow: hidden;
   .main-card{
     flex: 1;
     min-width: 400px;
     padding: 0 15px;
     &:first-child{
       padding-right: 15px;
       padding-left: 0;
     }
     &:last-child{
       padding-left: 15px;
       padding-right: 0;
     }
   }
}
  .h30{
    height: 30px;
    width: 100%;
    background-color: transparent;
  }
</style>

