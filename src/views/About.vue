<template>
  <div class="about">
    <sn-checkbox
            active-color="#13ce66"
            inactive-color="#ff4949"
    >备选项</sn-checkbox>
  </div>

</template>
<script>
  import 'element-ui/lib/theme-chalk/index.css';
  import {Checkbox} from '_c'
  const components={
    'sn-checkbox':Checkbox
  };
  export default {
    name:'app',
    mixins: [],
    data() {
      return {
          checked:true
      }
    },
    computed: {},
    methods: {},
    created(){
    },
    components,
  }
</script>
<style lang="less">

</style>
