const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // 提供webpack配置对象，告知webpack对应的模式的优化
    // development： 会将DefinePlugin 的 process.env.NODE_ENV 的值设置为development，为模块和 chunk 启用有效的名。
    // production：会将DefinePlugin 的 process.env.NODE_ENV 的值设置为production，为模块和 chunk 启用确定性的混淆名称。
    mode: 'development',

    // 按顺序解析扩展名，用户引入模块时可以不带扩展
    resolve: {
        extensions: ['.js', '.vue']
    },

    // 如何输出，在哪里输出
    output: {
        // path: output 对应的绝对路径
        path: path.resolve(__dirname, '../dist'),
        // 对于按需加载或者外部资源加载（CDN）来说是重要的选项，以下是几种常见配置
        // publicPath: 'auto', // It automatically determines the public path from either `import.meta.url`, `document.currentScript`, `<script />` or `self.location`.
        // publicPath: 'https://cdn.example.com/assets/', // CDN（总是 HTTPS 协议）
        // publicPath: '//cdn.example.com/assets/', // CDN（协议相同）
        // publicPath: '/assets/', // 相对于服务(server-relative)
        // publicPath: 'assets/', // 相对于 HTML 页面
        // publicPath: '../assets/', // 相对于 HTML 页面
        // publicPath: '', // 相对于 HTML 页面（目录相同）
        // 也可以在入口文件使用 变量动态配置 __webpack_public_path__
        publicPath: '/',
        // 每个输出 bundle 的名称
        filename: '[name].bundle.js'
    },

    // 如何处理项目中不同模块
    module: {
        // 规则数组，能对模块应用loader或者parser
        rules: [
            {
                // rule条件：test, include, exclude 和 resource 
                // 有俩种输入值，一种是resource：资源文件的绝对路径。它已经根据 resolve 规则解析。一种是issuer: 导入文件的绝对位置。
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000    // 10Kb
                    }
                }
            }
        ]
    },

    // 在webpack 编译周期特定节点执行特定功能
    plugins: [
        // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
        new VueLoaderPlugin()
    ]
};