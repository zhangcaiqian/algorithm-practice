const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    // 入口：可以用单个，也可以用多个入口
    entry: {
        client: path.resolve(__dirname, '../src/entry-client.js')
    },

    plugins: [
        // 生成 `vue-ssr-client-manifest.json`，提供客户端清单 (client manifest) 以及页面模板
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html'
        })
    ]
});