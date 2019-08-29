<template>
  <div class="ske-app">
    
    <div class="ske-text">正在加载请稍候....</div>
    <div id="skeleton1" class="ske-pic">
      <div class="img-wrapper">
        <ul>
          <li class="list-item" v-for="n in 4" :key="n">
            <span class="grey-rect">加载中..</span>
          </li>
        </ul>
      </div>
    </div>
    <div id="skeleton2" class="ske-pic">
      <div class="img-wrapper">
        <ul>
          <li class="list-item" v-for="n in 4" :key="n">
            <span class="grey-rect">ABCDEFG</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
console.log(1221212121212);
  export default {
    name: "Skeleton.vue"
  }
</script>

<style lang="stylus" scoped>
  .ske-app
    text-align center 
    color #333333
</style>
