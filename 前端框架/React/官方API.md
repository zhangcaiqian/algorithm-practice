### JSX
是什么？Javascript 语法扩展

设计思想： 渲染逻辑本质与其他UI逻辑内在耦合，如UI中邦定时间，在某些状态发生变化时通知UI

安全性：渲染输入内容前，进行转义，生成字符串，防止xss攻击

编译：Babel把JSX转成React.createElement()函数调用

### 元素渲染
是什么？ 构成React应用的最小砖块

React元素创建普通对象，React DOM负责更新DON与React元素保持一致

如何更新？ 不可改变对象，一单创建，无法更改子元素或属性。

且更新时只会更新实际改变了的内容

### 组件和属性
允许将UI拆分成独立可复用的代码片段，并对每个片段进行独立构思。

定义：从概念上类似JS函数，接受任意入参（props），返回描述页面展示内容的React元素

规范： React组件必须像蠢函数一样保护它们的props不被更改

### state 的使用
1. 不要直接修改state，应该用 setState()
2. State 的更新可能是异步的，处于性能考虑，React可能会把多个setState 合并成一个调用
```
// Wrong
this.setState({
    counter: this.state.counter + this.props.increment,
});
// Correct
this.setState(function(state, props) {
    return {
        counter: state.counter + props.increment
    };
});
```
3. 数据是向下流动的
state是封装的，除了拥有它的组件，其他组件都无法访问。
>>>「数据是单向流动的」，state属于特定组件，并且只能影响树中地狱它们的组件。

### 事件处理
与DOM元素区别
1. 命名采用小驼峰，而不是纯小谢
2. JSX传入函数，而不是字符串
3. 需要阻止默认行为时不能通过返回false，必须显式使用preventDefault


### 条件渲染
创建不同组件来封装行为
1. if 
2. &&
3. 三目
4. 阻止组件渲染
// 在组件的 render 方法中返回 null 并不会影响组件的生命周期

### 列表 & key
### 状态提升
多个组件需要反映相同的变化数据，将共享状态提升到最近的共同父组件中去
### 组合 & 继承
rops 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。










### 文档
[官方文档](https://zh-hans.reactjs.org/docs/introducing-jsx.html)