<template>
  <div class="box">
<!--     <div class="title">控件</div>
     <div class="sub mt60">按钮</div>
     <div class="bc-white mt20  flex">
        <div>
            <sn-button fixed>Default</sn-button>
            <sn-button type="primary" class="ml30" fixed>Primary</sn-button>
            <sn-button  class="ml30" disabled fixed>disabled</sn-button>
        </div>
         <div class="pl60 tips a-center">
             <p>固定宽高：w=100px H=36px</p>
             <p>圆角：2px</p>
         </div>
     </div>
     <div class="bc-white mt20  flex">
        <div>
            <sn-button ghost>Default</sn-button>
            <sn-button type="primary" class="ml30" ghost>Primary</sn-button>
            <sn-button type="success" class="ml30" ghost>success</sn-button>
            <sn-button type="error" class="ml30" ghost>error</sn-button>
        </div>
         <div class="pl60 tips a-center">
             <p>固定高度：H=26px</p>
             <p>宽度随字体数量变化，两侧距边框16px</p>
             <p>圆角：2px</p>
         </div>
     </div>-->
  </div>

</template>
<script>
/*  import {Button,ButtonGroup} from '_c'
  const components={
    'sn-button':Button,
    'sn-button-group':ButtonGroup,
  };*/
  export default {
    name:'app',
    mixins: [],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    created(){
    },
    //components,
  }
</script>
<!--<style lang="less" scoped>
  .box{
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    background-color: #FAFBFC;
    padding: 10px 135px;
    box-sizing: border-box;
  }
.title{
  height:40px;
  font-size:40px;
  font-weight:300;
  color:rgba(53,64,82,1);
  line-height: 1;
}
  .sub{
    height:14px;
    font-size:14px;
    font-weight:bold;
    color:@sub;
    line-height: 1;
  }
  .bc-white{
    background-color: #fff;
    padding: 40px;
  }
.tips{
    font-weight:400;
    color:rgba(185,191,200,1);
    line-height:36px;
}
</style>-->
