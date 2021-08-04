### 作用及由来
+ 代码可复用，防止全局污染，提高开发效率
### CJS规范
规范代表库：CommonJS
> 每一个文件就是一个模块，拥有自己独立的作用域，变量，以及方法等，对其他的模块都不可见。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。
模块加载的顺序，按照其在代码中出现的顺序。
```
    // 定义模块math.js
    var basicNum = 0;
    function add(a, b) {
      return a + b;
    }
    module.exports = { //在这里写上需要向外暴露的函数、变量
      add: add,
      basicNum: basicNum
    }

    var math = require('./math');
    math.add(2, 5);
```

### AMD规范
规范库代表：RequireJS
> RequireJS 是一个JavaScript模块加载器（文件和模块载入工具）
```
    /** 网页中引入require.js及main.js **/
    <script src="js/require.js" data-main="js/main"></script>
    
    /** main.js 入口文件/主模块 **/
    // 首先用config()指定各模块路径和引用名
    require.config({
      baseUrl: "js/lib",
      paths: {
        "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
        "underscore": "underscore.min",
      }
    });
    // 执行基本操作
    require(["jquery","underscore"],function($,_){
      // some code here
    });

```

### ESM
+ 原生es6的规范，类似common.js ，异步加载机制能通过type = module 设置。
> export 向外暴露或到处模块 export default XXX;
> import 引入模块 import {XX} form './xx.js';

```
    /** 定义模块 math.js **/
    var basicNum = 0;
    var add = function (a, b) {
        return a + b;
    };
    export { basicNum, add };

    /** 引用模块 **/
    import { basicNum, add } from './math';
    function test(ele) {
        ele.textContent = add(99 + basicNum);
    }
```

### 文章链接
[掘金文章](https://juejin.cn/post/6850418113154908174)
