/** 
// 在安装一个 package，而此 package 要打包到生产环境 bundle 中时，你应该使用 npm install --save。
// 如果你在安装一个用于开发环境目的的 package 时（例如，linter, 测试库等），你应该使用 npm install --save-dev。

**/
// babel-polyfill的使用方法： 一种是在webpack配置文件的入口配置项前引入，一种是在入口文件中引入（如下）
// import '@babel/polyfill';
import Vue from 'vue'
import './assets/css/style.css'
import './assets/css/index.scss'
import getData from './assets/js/until.js'
import App from './App.vue'
import router from './router';
/**** 关于.babelrc与babel.config.js是两种配置babel的写法，在官方文档中可以查看具体信息  https://www.cnblogs.com/wuguanglin/p/10593013.html
 * babel.config.js
 */

//如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
new Vue({
  router,
  render:h => h(App)
}).$mount('#root')
// var app = new Vue({
//   el: "#app",
//   data: {
//     message: 'hello webpack!!'
//   },
//   created() {
//     this.resetMessage();
//   },
//   methods: {
//     resetMessage() {
//       getData().then((res) => {
//         this.message = this.message + res;
//       });
//     }
//   }
// })
console.log('eeeeeeeeeeeeeee');
// TODO 
// 1. 移动端适配
// 2. 路由
// vuex