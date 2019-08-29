import Vue from 'vue';
import Skeleton from './Skeleton.vue';
console.log('Skeleton1111111111111111',Skeleton);
export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
  // render: function(h) {
  //   return h('div',[h(Skeleton)]);
  // }
});
