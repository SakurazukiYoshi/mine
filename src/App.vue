<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>

  const components={

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
      console.log(axios);
    },
    components,
  }

</script>

<style lang="less">

</style>
