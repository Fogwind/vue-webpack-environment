const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  mode: 'development',
  // babel-polyfill的使用方法： 一种是在webpack配置文件的入口配置项前引入（如下），一种是在入口文件中引入
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
    extensions: ['.js', '.json','.vue']
  },
  plugins: [
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
    new VueLoaderPlugin() // 要使用vue单文件组件，除了配置vue-loader外，还要配置这个插件
  ],
  module: {
      rules: [
          {
              test: /\.(css|scss)$/,
              use: [
                "style-loader", // 将 JS 字符串生成为 style 节点
                "css-loader", // 将 CSS 转化成 CommonJS 模块
                "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
              ]
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