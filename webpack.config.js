const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 分离css代码插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 骨架屏插件
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

module.exports = {
  mode: 'development',
  // babel-polyfill的使用方法： 一种是在webpack配置文件的入口配置项前引入（如下），一种是在入口文件中引入
  // 如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
  entry: ['@babel/polyfill','./src/index.js'],
  // entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
      '@':path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json','.vue','.styl']
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: "src/assets/css/common.css"
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          title: '管理输出',
          filename : 'index.html',
          template : './index.html', // 模板文件地址
      }),
    //   new HtmlWebpackPlugin({
    //        // Required
    //        inject: false,
    //        template: require('html-webpack-template'),
    //        appMountId: 'app',
    //     //    appMountHtmlSnippet: '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i></div>',
    //     //    headHtmlSnippet: '<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style >',
    //   })
    new VueLoaderPlugin(), // 要使用vue单文件组件，除了配置vue-loader外，还要配置这个插件
    new SkeletonWebpackPlugin({ // 骨架屏插件
      webpackConfig: {
        entry: {
          // 为什么改成main就可以了呢，app就不行了呢 因为入口entry字段默认是main
          // app: path.resolve('./src/entry-skeleton.js')
          main: path.join(__dirname, './src/entry-skeleton.js')
        }
      },
      insertAfter:'<div id="root">', // 骨架页面的挂载点
      quiet: true,
      minimize:true
    })
    // new SkeletonWebpackPlugin({
    //   webpackConfig: {
    //       entry: {
    //           app: resolve('./src/entry-skeleton.js')
    //       }
    //   },
    //   quiet: true,
    //   minimize: true,
    //   router: {
    //       mode: 'history',
    //       routes: [
    //           {
    //               path: '/page1',
    //               skeletonId: 'skeleton1'
    //           },
    //           {
    //               path: '/page2',
    //               skeletonId: 'skeleton2'
    //           }
    //       ]
    //   }
    // })
  ],
  module: {
      rules: [
          {
              test: /\.(css|scss)$/,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader", 
                "sass-loader", 
              ],
              // use: [
              //   "style-loader", // 将 JS 字符串生成为 style 节点
              //   "css-loader", // 将 CSS 转化成 CommonJS 模块
              //   "sass-loader", // 将 Sass 编译成 CSS，默认使用 Node Sass
              // ]
          },
          /****
           * stylus-loader 使用vue-style-loader配置可以编译，使用style-loader配置报window is not defined，原因是我用了服务端渲染骨架屏，此时无法获取到dom API
           * style-loader是将样式插入到dom内，可能是需要用到window对象。
           * 你是在做服务端渲染的东西吗？如果是的话是因为服务端没有window对象，所以会报这个错
           * 解决办法是用isomorphic-style-loader这个包
           * 
           * 
           */
          {
            test: /\.styl(us)?$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'stylus-loader'
            ]
            // use: [
            //   'isomorphic-style-loader',
            //   'css-loader',
            //   'stylus-loader'
            // ]
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  'file-loader'
              ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
            }
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
      ]
  }
};