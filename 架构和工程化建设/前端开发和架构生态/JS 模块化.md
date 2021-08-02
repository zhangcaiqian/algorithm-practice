### 作用及由来
+ 代码可复用，防止全局污染，提高开发效率
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

### Common.js
