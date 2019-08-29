<template>
  <div class="app-page">
    
      <h1 @click="test">测试stylus样式</h1>
   
      
      <!-- <my-home></my-home> -->
      <router-view/>
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
    },
    methods: {
      test() {
        // console.log(123);
        // alert(123);
        this.$router.push({name: 'about'});
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app-page
    text-align left
</style>