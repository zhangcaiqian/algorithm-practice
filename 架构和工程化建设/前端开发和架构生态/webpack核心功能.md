### entry
入口文件
### output
输出路径
### Loader
>  loader 对文件进行预处理，将源文件经过转换后生成目标文件并交由下一流程处理 
链式调用、无副作用
> style-loader、css-loader、sass-loader、vue-loader、babel-loader

```
module.exports = {
  module: {
    rules: [
        {
          test: /\.scss$/,
          use:[
              {loader:'style-loader'},
              {loader:'css-loader',options:{sourceMap:true,modules:true}},
              {loader:'sass-loader',options:{sourceMap:true}}
          ],
          exclude:/node_modules/
      }
    ]
  }
}
```

### module 
> 开发者将程序分解为功能离散的 chunk，并称之为 模块 , js范畴内的es module、commonJs、AMD等，css @import、url(...)、图片、字体等在webpack中都被视为模块。

> 如何处理项目中不同模块

### plugin
> 在webpack 编译周期特定节点执行特定功能
> 常见 plugin UglifyJsPlugin、html-webpack-plugin
> HotModuleReplacementPlugin

### loader 和 plugin的区别
+ loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
+ plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事
+ loader 运行在打包文件之前，plugins 在整个编译周期都起作用
### 性能优化
> speed-measure-webpack-plugin 
+ 优化Loader配置,缩小文件搜索范围
+ 合理使用DLLPlugin将更改频率较低的代码（三方库）移到单独的编译
+ 多进程:thread-loader

### 热更新模块
+ HMR全称 Hot Module Replacement，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用
```
const webpack = require('webpack')
module.exports = {
  // ...
  devServer: {
    // 开启 HMR 特性
    hot: true
    // hotOnly: true
  }
}
```
+ 原理
1. 启动阶段为上图 1 - 2 - A - B
在编写未经过webpack打包的源代码后，Webpack Compile 将源代码和 HMR Runtime 一起编译成 bundle文件，传输给Bundle Server 静态资源服务器
2. 更新阶段为上图 1 - 2 - 3 - 4
当某一个文件或者模块发生变化时，webpack监听到文件变化对文件重新编译打包，编译生成唯一的hash值，这个hash值用来作为下一次热更新的标识
3. 在浏览器接受到这条消息之前，浏览器已经在上一次socket 消息中已经记住了此时的hash 标识，这时候我们会创建一个 ajax 去服务端请求获取到变化内容的 manifest 文件

mainfest文件包含重新build生成的hash值，以及变化的模块，对应上图的c属性

浏览器根据 manifest 文件获取模块变化的内容，从而触发render流程，实现局部模块更新

根据变化的内容生成两个补丁文件：manifest（包含了 hash 和 chundId，用来说明变化的内容）和chunk.js 模块

由于socket服务器在HMR Runtime 和 HMR Server之间建立 websocket链接，当文件发生改动的时候，服务端会向浏览器推送一条消息，消息包含文件改动后生成的hash值，如下图的h属性，作为下一次热更细的标识

![测试](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/webpack热更新.png)


### Webpack proxy
webpack proxy，即webpack提供的代理服务

基本行为就是接收客户端发送的请求后转发给其他服务器

其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）

想要实现代理首先需要一个中间服务器，webpack中提供服务器的工具为webpack-dev-server

proxy工作原理实质上是利用http-proxy-middleware 这个http代理中间件，实现请求转发给其他服务器。

![测试](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/webpackProxy.png)


### 提高webpack 速度
+ 优化 loader 配置
+ 合理使用 resolve.extensions
+ 优化 resolve.modules
+ 优化 resolve.alias
+ 使用 DLLPlugin 插件
+ 使用 cache-loader
+ terser 启动多线程
+ 合理使用 sourceMap

### 对比Rollup
+ 代码效率更简洁、效率更高
+ 默认支持 Tree-shaking
+ ES 打包


### 官方文档
[webpack](https://webpack.docschina.org/configuration/output/)


