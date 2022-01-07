> 遇到需求时，直接考虑在Hooks中如何实现
### useState 让函数组件具有维持状态的能力

和类组件的区别，类组件的state只有一个，所以一般把一个对象作为state，函数组件useState 则一般创建多个state

> state 中永远不要保存「可以通过计算得到的值」
如：
1. 处理props的值
2. 从URL中读取参数
3. 从cookie、localStorage中读取值

