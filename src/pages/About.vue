<template>
  <div class="home-page">{{text}}123</div>
</template>

<script>
import getData from '../assets/js/until.js'
  export default {
    name:'Home',
    components:{
    },
    data() {
        return {
          text: 'Hello Big Bee'
        }
    },
    created() {
        this.fetchData('Onepiece');
    },
    methods: {
        async fetchData(str) {
          const data = await getData(str);
          this.text = data;
        }
    }
  }
</script>

<style lang="scss" scoped>
  $txtColor:#44da31;
  .home-page{
    color:$txtColor;
    text-align: center;
  }
</style>