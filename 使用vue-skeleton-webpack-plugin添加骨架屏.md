# 使用vue-skeleton-webpack-plugin添加骨架屏
> 插件的github地址：[vue-skeleton-webpack-plugin](https://github.com/lavas-project/vue-skeleton-webpack-plugin)

  在逛淘宝，逛知乎的时候发现在跳转页面的时候会先出现该页面上元素的大致布局（有一个名词叫骨架屏），等数据加载完成的时候在对应的位置上会渲染出数据，感觉很新颖，就想看看背后的实现。

最简单的方法就是在写页面的时候顺便写一套与该页面对应的骨架屏样式，数据加载完成前显示骨架屏样式，数据加载完成后隐藏骨架屏。

在想到这种方法的基础上又在网络上找了一下关于骨架屏的资料，由于平时是用Vue开发项目，所以就重点找了在vue项目中使用骨架屏的资料，找到了两个插件，一个是百度开发的vue-skeleton-webpack-plugin，一个是饿了么开发的page-skeleton-webpack-plugin。百度在其[LAVAS文档](https://lavas.baidu.com/guide/v2/webpack/vue-skeleton-webpack-plugin)中说过，vue-skeleton-webpack-plugin是受到[饿了么的 PWA 升级实践](https://huangxuan.me/2017/07/12/upgrading-eleme-to-pwa/#%E5%9C%A8%E6%9E%84%E5%BB%BA%E6%97%B6%E4%BD%BF%E7%94%A8-vue-%E9%A2%84%E6%B8%B2%E6%9F%93%E9%AA%A8%E6%9E%B6%E5%B1%8F)一文的启发而开发的，所以二者的实现原理是一样的，都使用vue的服务端渲染实现，不过饿了么开发的插件比百度的功能更强大，在下一篇关于page-skeleton-webpack-plugin的文章中提到。下面先介绍vue-skeleton-webpack-plugin。

下面会分别介绍在webpack.config.js和vue.config.js中使用vue-skeleton-webpack-plugin。

## 通用的配置

这一部分是不管在webpack.config.js中，还是在vue.config.js中都要配置的。

安装vue-skeleton-webpack-plugin：
```
npm install vue-skeleton-webpack-plugin
```
添加骨架屏配置文件:

在项目目录下创建一个skeleton文件夹（我创建在了src文件夹下），在该文件夹下创建两个文件：骨架屏的入口文件entry-skeleton.js和骨架屏组件Skeleton.vue文件。
Skeleton.vue文件中是骨架屏样式代码，可以根据不同页面的样式自己编写对应的骨架样式，例如：
```html
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
export default {
  name: "Skeleton.vue"
}
</script>
<style lang="stylus" scoped>
.ske-app
  text-align center 
  color #333333
</style>

```

entry-skeleton.js是骨架屏的入口文件，上面的Skeleton.vue文件在这里使用，代码如下：
```javascript
import Vue from 'vue';
import Skeleton from './Skeleton.vue';

export default new Vue({
  components: {
    Skeleton,
  },
  render: h => h(Skeleton),
});
```
注意到Skeleton.vue文件中的样式有两部分，分别是id为skeleton1的元素对应的部分和id为skeleton2的元素对应的部分。原因是在这个例子中有两个路由，这两部分骨架样式分别对应到这两个路由，这样在切换路由时就可以先在页面上显示出将要加载的那个页面的骨架样式。

也可以将这两部分样式拆分为两个文件：SkeletonOne.vue和SkeletonTwo.vue。相应的entry-skeleton.js入口文件中的写法也要改一下：
```javascript
import Vue from 'vue';
import SkeletonOne from './SkeletonOne.vue';
import SkeletonTwo from './SkeletonTwo.vue';
export default new Vue({
  components: {
    SkeletonOne,
    SkeletonTwo
  },
  //render: h => h(Skeleton),
  render(h) {
    return h('div',[h(SkeletonOne),h(SkeletonTwo)]);
  }
});
```
通用的配置已经完成了。
## 在webpack.config.js中配置
根据vue-skeleton-webpack-plugin插件的文档说明，在webpack中配置该插件前，需要先开启webpakc的样式分离功能。文档原话如下：
> “由于插件使用了 Vue 服务端渲染在构建时渲染 skeleton 组件，将 DOM 和样式内联到最终输出的 html 中。 因此在给 skeleton 使用的 Webpack 配置对象中需要开启样式分离，将 skeleton 使用的样式从 JS 中分离出来。”

Webpack3使用extract-text-webpack-plugin开启样式分离，webpack4使用mini-css-extract-plugin开启样式分离。

配置代码：
```javascript
const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
module.exports = {
  // ...其他配置
  entry: ['@babel/polyfill','./src/index.js'],
  plugins: [
    // ...其他配置
    new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          main: path.join(__dirname, './src/skeleton/entry-skeleton.js')
        }
      },
      quiet: true,
      minimize: true,
      insertAfter:'<div id="root">', // 默认使用<div id="app">挂载点
      router: {
        mode: 'hash', // hash || history
        routes: [
          {
            path: '/',
            skeletonId: 'skeleton1'
          },
          {
            path: '/about',
            skeletonId: 'skeleton2'
          }
        ]
      }
    })
  ]
};
```

这里不对插件配置对象的各个字段进行解释，文档中写的很明白。但是有一点要说明，就是webpackConfig配置对象中的entry字段，这里使用的是对象的写法，键使用的是main。这里键名要与webpack中entry字段配置入口文件时使用的键名保持一致。上面的代码中webpack中entry字段的值使用的数组写法，没那么键名默认就为main，所以webpackConfig中使用的main。

这样webpack中插件的配置就完成了。
## 在vue.config.js中配置
在vue.config.js中使用vue-skeleton-webpack-plugin插件，也需要开启样式分离。Vue-cli3中在生产模式下默认是开启样式分离的。

Vue-cli中提供了configureWebpack字段作为配置webpack的入口，所以可以通过这个入口配置骨架屏插件，代码如下：
```javascript
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const path = require('path');
module.exports = {
  // ...其他配置
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/skeleton/entry-skeleton.js')
          }
        },
        quiet: true,
        minimize: true,
        insertAfter:'<div id="root">', // 默认使用<div id="app">挂载点
        router: {
          mode: 'hash', // hash || history
          routes: [
            {
              path: '/',
              skeletonId: 'skeleton1'
            },
            {
              path: '/about',
              skeletonId: 'skeleton2'
            }
          ]
        }
      })
    ]
  }
};
```

注意到，这里插件配置对象webpackConfig中entry对象中配置骨架样式入口文件的键名是app，而不是main，推测原因是vue-cli在内部把webpack配置入口文件的键名写成了app。

至此骨架屏插件vue-skeleton-webpack-plugin在webpack和vue-cli中的配置均已完成。启动项目，在vue实例挂载点被替换之前会先显示骨架样式。

问题来了，现在的前端页面都是通过ajax从服务端请求数据然后渲染到页面上的，而vue-skeleton-webpack-plugin插件仅仅是帮我们把骨架样式插入到了vue实例的挂载点中，只是解决了vue实例创建完成前页面内容的展示问题，并没有真正的与vue的运行时结合，所以就不能根据ajax请求的状态随意的控制骨架样式的显示与隐藏。这不是我想要的效果。

* * *
TO BE CONTINUE