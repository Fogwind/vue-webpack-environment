const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 分离css代码插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 骨架屏插件
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
// webpack4中已经内置了UglifyJs插件，当打包模式参数mode设置为production时就会自动开启
module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
//   entry: { // entry字段写成对象形式的话，打包后每个字段对应的js文件会生成对应的压缩文件
//     babel: '@babel/polyfill',
//     main: './src/index.js',
//     vendor: [
//         'vue'
//     ]
//   },
  output: {
    filename: '[name].[hash].js', //'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
      '@':path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json','.vue','.styl']
  },
  //optimization.runtimeChunk: true
  // https://webpack.js.org/configuration/optimization/
//   optimization: {
//     runtimeChunk: true,
//     splitChunks: {
//         chunks: 'all'
//     //   cacheGroups: {
//     //     commons: {
//     //       name: 'commons',
//     //       chunks: 'initial',
//     //       minChunks: 2
//     //     }
//     //   }
//     }
//   },

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
      new VueLoaderPlugin(),
    //   new SkeletonWebpackPlugin({ // 骨架屏插件
    //     webpackConfig: {
    //       entry: {
    //         // 为什么改成main就可以了呢，app就不行了呢
    //         // app: path.resolve('./src/entry-skeleton.js')
    //         main: path.join(__dirname, './src/entry-skeleton.js')
    //       }
    //     },
    //     insertAfter:'<div id="root">', // 骨架页面的挂载点
    //     quiet: true,
    //     minimize:true
    //   }),
    new SkeletonWebpackPlugin({
      webpackConfig: {
          entry: {
            main: path.join(__dirname, './src/entry-skeleton.js')
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
        },
        {
          test: /\.styl(us)?$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
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

