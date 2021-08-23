http://blog.poetries.top/2019/10/02/rn-yuanli/
https://juejin.cn/post/6844903553283129352

### React 
纯JS库，封装Virtual Dom ，数据驱动编程

### React Native
React 驱动是 JS Engine，React Native 内，RN的原生代码（Timer和用户事件）驱动JS Engine， JSEngine 解析执行React，把计算结果返回给Native Code，然后Native Code根据JS计算出来的结果驱动设备上能驱动的硬件

利用React 的Virtual Dom，简化原生开发。

### 组件组成
JavaScriptCore负责JS代码解释执行
ReactJS负责描述和管理VirtualDom,指挥原生组件进行绘制和更新，同时很多计算逻辑也在js里面进行。ReactJS自身是不直接绘制UI的，UI绘制是非常耗时的操作，原生组件最擅长这事情。
Bridges用来翻译ReactJS的绘制指令给原生组件进行绘制，同时把原生组件接收到的用户事件反馈给ReactJS。