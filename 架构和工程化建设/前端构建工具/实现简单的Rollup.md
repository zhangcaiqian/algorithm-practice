### 应用场景 
1. Vite 开发服务器和构建指令
2. Vite 基于原生JS模块提供丰富的内建功能，模块热更新
3. Vite采用Rollup打包
4. JS 库打包


### 和 webpack 的区别
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/Rollup1.png)

### Rollup打包方案
# 支持在ES6模块编写方案时，打包生成符合各个环境和规范的标准代码
# treeShaking
## Webpack 5 后引入


### 简单用法
### Input
### Output

```
// rollup.config.js
export default {
    input: 'src/main.js',
    ouput: {
        file: 'bundle.js',
        format: 'cjs'
    }
}

```
### external
### plugin
### 分模块打包
```
// rollup.config.js
export default {
    input: ['src/main.js', 'src/main1.js'],
    ouput: {
        dir: dist,
        format: 'cjs',
        chunkFileNames: 'rollup-[name]-[hash].js',
        entryFikeNames: 'rollup-[name].js'
    }
}

```
### 打包成不同的形式


```
// rollup.config.js
export default {
    input: 'src/main.js',
    ouput: [{
        dir: dist/cjs,
        file: 'bundle.js',
        format: 'cjs'
    },{
        dir: dist/system,
        file: 'bundle.js',
        format: 'system'
    }]
}

```
