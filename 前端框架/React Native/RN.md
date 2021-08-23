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

### Bridge
+ Bridge的作用就是给RN内嵌的JS Engine提供原生接口的扩展供JS调用。所有的本地存储、图片资源访问、图形图像绘制、3D加速、网络访问、震动效果、NFC、原生控件绘制、地图、定位、通知等都是通过Bridge封装成JS接口以后注入JS Engine供JS调用。

+ Bridge 原生代码负责管理原生模块并生成对应的JS模块信息供JS代码调用。每个功能JS层的封装主要是针对ReactJS做适配，让原生模块的功能能够更加容易被用ReactJS调用。MessageQueue.js是Bridge在JS层的代理，所有JS2N和N2JS的调用都会经过MessageQueue.js来转发。JS和Native之间不存在任何指针传递，所有参数都是字符串传递。所有的instance都会被在JS和Native两边分别编号，然后做一个映射,然后那个数字/字符串编号会做为一个查找依据来定位跨界对象。

### RN 加载步骤
原生代码加载
JS Engine初始化(生成一个空的JS引擎)
JS基础设施初始化. 主要是require等基本模块的加载并替换JS默认的实现。自定义require, Warning window, Alert window, fetch等都是在这里进行的。基础设施初始化好以后就可以开始加载js代码了
遍历加载所有要导出给JS用的原生模块和方法, 生成对应的JS模块信息，打包成json的格式给JS Engine, 准确地说是给MessageQueue.