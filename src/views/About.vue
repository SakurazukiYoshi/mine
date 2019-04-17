<template>
  <div class="about">
    <sn-loading :visible="true"></sn-loading>
  </div>

</template>
<script>
  import {Loading} from '_c'
  const components={
    'sn-loading':Loading
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

</style>