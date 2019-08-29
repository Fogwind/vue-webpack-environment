const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
});