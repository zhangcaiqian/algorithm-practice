利用 HTTP 模块 我们已经能构建 Web 应用, 但是这个模块还是过于底层, 使用起来是比较的繁琐. 离直接跟底层协议打交道好不了多少, 最早对 HTTP 模块进行封装的 Node.js 框架, 其中比较流行的一个有 Express, 它做了很多简化的工作和增强了扩展的功能, 最主要是引进了中间件的概念, 获得了很多好评。


### Koa 中间件
中间件是 Koa 一个重要的概念，它是一个执行的链条，整个链条组成了一个运行的周期。
每一个中间件负责特定的小模块，互相配合，组合成一条完整的业务通道。

中间件的功能也为 Koa 项目的扩展提供了很大的便利性，因为一些特定成熟的功能可以抽象成一个个模块共享出来，比如 路由模块、模版引擎 ... 让我们可以站在巨人的肩膀，直接在项目中导入使用这些成熟的模块

### 上下文
中间件函数中另外一个参数 ctx，是一个环境上下文参数，解决了中间件之间的依赖问题，是中间件之间的全局变量
