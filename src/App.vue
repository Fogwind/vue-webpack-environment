<template>
  <div class="app-page">
      <my-home></my-home>
  </div>
</template>

<script>
  import MyHome from './pages/Home.vue';
  export default {
    name:'App',
    components:{
        MyHome
    },
    data() {
        return {
         
        }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>