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

### 性能优化
> speed-measure-webpack-plugin 
+ 优化Loader配置,缩小文件搜索范围
+ 合理使用DLLPlugin将更改频率较低的代码（三方库）移到单独的编译
+ 多进程:thread-loader

### 官方文档
[webpack](https://webpack.docschina.org/configuration/output/)


