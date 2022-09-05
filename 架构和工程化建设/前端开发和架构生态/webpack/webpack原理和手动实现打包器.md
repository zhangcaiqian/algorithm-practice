### 定义
> Webpack is a static module bundler for modern JavaScript applications.
> Webpack 就是一个前端模块打包器，将前端模块打包成1个或多个模块。

为什么需要webpack 呢？
+ 不是所有的浏览器支持Javascript规范
+ 前端需要管理依赖脚本，把控不同脚本加载的顺序
+ 前端需要按顺序加载不同类型的静态资源

在打包的过程中，需要：
+ 维护不同脚本的打包顺序，保证bundle.js的可用性
+ 避免不同脚本、不同模块的命名冲突
+ 删除掉没有用的脚本

一个打包示例：
```
// filename: circle.js
const PI = 3.141;
export default function area(radius) {
    return PI * radius * radius;
}
// filename: square.js
export default function area(side) {
    return side * side;
}
// filename: app.js
import squareArea from './square';
import circleArea from './circle';
console.log('Area of square: ', squareArea(5));
console.log('Area of circle', circleArea(5));
```
打包后产物：
```
// filename: bundle.js
const modules = {
    'circle.js': function(exports, require) {
        const PI = 3.141;
        exports.default = function area(radius) {
            return PI * radius * radius;
        }
    },
    'square.js': function(exports, require) {
        exports.default = function area(side) {
            return side * side;
        }
    },
    'app.js': function(exports, require) {
        const squareArea = require('square.js').default;
        const circleArea = require('circle.js').default;
        console.log('Area of square: ', squareArea(5))
        console.log('Area of circle', circleArea(5))
    }

}

webpackBundle({

  modules,

  entry: 'app.js'

});

```
key 为模块路径名,value为包裹函数

总结：
+ 使用了 module map，维护项目中的依赖关系；
+ 使用了包裹函数，对每个模块进行包裹；
+ 使用了一个“runtime”方法（这里举例为webpackBundle），最终合成 bundle 内容。


### 手动实现打包器
+ 读取入口文件（比如entry.js）；
+ 基于 AST 分析入口文件，并产出依赖列表；
+ 使用 Babel 将相关模块编译到 ES5；
+ 对每个依赖模块产出一个唯一的 ID，方便后续读取模块相关内容；
+ 将每个依赖以及经过 Babel 编译过后的内容，存储在一个对象中进行维护；
+ 遍历上一步中的对象，构建出一个依赖图（Dependency Graph）；
+ 将各模块内容 bundle 产出。

详细代码：

主要还是，依赖解析（Dependency Resolution）和代码打包（Bundling）
