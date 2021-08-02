### 什么是Babel
Babel 是一个Javascript编辑器（compiler），

宿主环境对新语言无法做到即时升级，而开发者需要兼容各种环境宿主环境，因此语言降级成为刚需。

它能做：
* 语法转换
* Pollyfill 补全相关功能
* 源码转换

它有几个特性
* 可拔插：灵活插件机制，召集第三方开发者接入
* 可调式：提供sourceMap
* 基于协定（Compact）：基于协定，实现灵活的配置方式

可以用
```
./node_modules/.bin/babel src --out-dir lib
```
或
```
npx src --out-dir lib
```
来进行测试验证

### 配置
在 babel.config.json 或 .babelrc.json 中
* tagets
* useBuiltIns
    * usage （需要的 polyfill）
    * entry （按targets加载polyfill)

### 核心库

#### @babel/core 
实现转化的核心功能
#### @babel/cli 
命令行工具， 常用的有

--out-dir  --plugins 和 --presets
#### Polyfill
现在放在core-js/stable 
#### @babel/standalone
在非 Node.js 环境（比如浏览器环境）自动编译含有 text/babel 或 text/jsx 的 type 值的 script 标签，并进行编译。

可以在浏览器中直接执行，对于浏览器环境动态插入高级语言特性的脚本、在线自动解析编译非常有意义。我们知道的 Babel 官网也用到了这个包，JSFiddle、JS Bin 等也都是 @babel/standalone 的受益者。

#### @babel/preset-env
直接暴露给用户的包能力。

代码转换以插件预设的形式出现，插件是小型JS函数，知道babel如何进行转换
```
npx babel src --out-dir lib --presets=@babel/env
```

#### @babel/core更底层的功能
@babel/parser、@babel/code-frame、@babel/generator、@babel/traverse、@babel/types，提供基础的AST能力
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/babelcompile.png)

### 分层设计理念
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/babel.png)
> babel-loader 就是 Babel 结合 Webpack，融入整个基建环节
> @babel/eslint-parser源码的实现，保留了相同的模板，它通过自定的 parser，最终返回了 ESLint 所需要的 AST 内容

