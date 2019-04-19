<template>
  <div class="box">
     <div class="title">控件</div>
     <div class="sub mt60">按钮</div>
     <div class="bc-white">
       <sn-button>Default</sn-button>
       <sn-button type="primary">Primary</sn-button>
       <sn-button type="dashed">Dashed</sn-button>
       <sn-button type="text">Text</sn-button>
     </div>
  </div>

</template>
<script>
  import {Button,ButtonGroup} from '_c'
  const components={
    'sn-button':Button,
    'sn-button-group':ButtonGroup,
  };
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
    components,
  }
</script>
<style lang="less">
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
    color:rgba(53,64,82,1);
    line-height: 1;
  }
  .mt60{
    margin-top: 60px;
  }
  .bc-white{
    background-color: #fff;
    padding: 40px;
  }
</style>
