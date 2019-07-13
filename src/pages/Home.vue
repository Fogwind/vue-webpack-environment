<template>
  <div class="home-page">{{text}}</div>
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
        this.fetchData('One Punch Man');
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
  $txtColor:#ffffff;
  .home-page{
    color:$txtColor;
    text-align: center;
  }
</style>