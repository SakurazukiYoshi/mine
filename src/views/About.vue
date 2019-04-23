<template>
  <div class="box">
     <div class="title">控件</div>
     <div class="sub mt60">按钮</div>
     <div class="bc-white mt20  flex">
        <div>
            <sn-button fixed>Default</sn-button>
            <sn-button type="primary" class="ml30" fixed>Primary</sn-button>
            <sn-button type="success" class="ml30" fixed>success</sn-button>
            <sn-button type="error" class="ml30" fixed>error</sn-button>
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
            <sn-button type="error" class="ml30" disabled ghost>error</sn-button>
        </div>
         <div class="pl60 tips a-center">
             <p>固定高度：H=26px</p>
             <p>宽度随字体数量变化，两侧距边框16px</p>
             <p>圆角：2px</p>
         </div>
     </div>
     <div class="bc-white mt20  flex">
        <div>
            <sn-button shape="circle">Default</sn-button>
            <sn-button type="primary" class="ml30"  shape="circle" fixed>Primary</sn-button>
            <sn-button type="success" class="ml30"  shape="circle" fixed>success</sn-button>
            <sn-button type="error" class="ml30"  shape="circle" fixed>error</sn-button>
            <sn-button type="error" class="ml30"  shape="circle" fixed disabled>error</sn-button>
        </div>
         <div class="pl60 tips a-center">
             <p>固定宽高：w=80px H=30px</p>
             <p>圆角：圆</p>
         </div>
     </div>

      <div class="title mt60">小图标</div>
      <div class="sub mt60">导航栏</div>
      <div class="bc-white mt20">
          <sn-icon type="username" :size="30" color="#c5ccd4"/>
      </div>

      <div class="sub mt60">选择</div>
      <div class="bc-white mt20">
          <sn-checkbox v-model="single">Checkbox</sn-checkbox>
          <span class="ml30">{{single}}</span>
      </div>
      <div class="bc-white">
          <sn-checkbox-group v-model="fruit">
              <sn-checkbox label="香蕉" disabled></sn-checkbox>
              <sn-checkbox label="苹果"></sn-checkbox>
              <sn-checkbox label="西瓜"></sn-checkbox>
          </sn-checkbox-group>
          <div class="mt20">{{fruit}}</div>
      </div>


      <div class="sub mt60">单选</div>
      <div class="bc-white">
          <sn-radio-group v-model="animal" vertical key="vertical">
              <sn-radio label="金斑蝶" disabled></sn-radio>
              <sn-radio label="爪哇犀牛"></sn-radio>
              <sn-radio label="印度黑羚"></sn-radio>
          </sn-radio-group>
          <div class="mt20">
              <sn-radio-group v-model="animal"  key="row">
                  <sn-radio label="金斑蝶" disabled></sn-radio>
                  <sn-radio label="爪哇犀牛"></sn-radio>
                  <sn-radio label="印度黑羚"></sn-radio>
              </sn-radio-group>
          </div>
          <div class="mt20">{{animal}}</div>
      </div>
  </div>

</template>
<script>
  import {Button,ButtonGroup,Icon,Checkbox,CheckboxGroup,Radio,RadioGroup} from '_c'
  const components={
    'sn-button':Button,
    'sn-button-group':ButtonGroup,
    'sn-icon':Icon,
    'sn-checkbox':Checkbox,
    'sn-checkbox-group':CheckboxGroup,
    'sn-radio':Radio,
    'sn-radio-group':RadioGroup,
  };
  export default {
    name:'app',
    mixins: [],
    data() {
      return {
          single:false,
          fruit: ['苹果'],
          animal: '爪哇犀牛'
      }
    },
    computed: {},
    methods: {},
    created(){
    },
    components,
  }
</script>
<style lang="scss" scoped>
.box{
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    background-color: #FAFBFC;
    padding: 10px 35px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x:hidden;
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
color:$sub;
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
</style>
