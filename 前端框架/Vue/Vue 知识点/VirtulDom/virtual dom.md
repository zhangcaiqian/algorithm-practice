### 核心思想
> 模拟树的结构，在内存中保存映射DOM信息节点数据，并且当交互等因素需要视图更新时，先通过diff得到差异结果，在一次性对DOM进行批量操作。
> Virtual Dom 是一个简单的 JS 对象，并且包含tag，props，children 等属性

### 策略
1. 按tree层级diff(level by level)
    + VirtualDOM的diff策略是在新旧节点树之间按层级进行diff得到差异
    ![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/VD按层级.jpeg)
2. 按类型进行Diff
    + 支队相同类型的同一节点进行diff，发生类型的改变时，直接创建新类型的VD
    ![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/VD按类型.jpeg)
3. 列表diff
    + 当diff节点处于同一层级时，通过三种节点操作进行更新：插入、删除和移动，同时提供给用户设置key属性的方式调整diff，在没有key值的情况下，需要按顺序对每个元素进行对比，效率较低
    ![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/VD按类型.jpeg)

### snabddom 中的VD
在h函数中，不光可以为VirtualDOM保存数据属性，还可以设置事件回调函数，并在其中获取并处理相关的事件属性，如update回调中的event对象。通过捕获事件中创建新的vnode，与旧的vnode进行diff，最终对当前的oldVnode进行更新，并向用户展示更新结果

+ 将页面的对象抽象成JS的形式，配合不同渲染工具，使得跨平台成为可能。
+ 可以在内存中进行比较，将多次对比结果一次性更新，减少渲染次数。
+ 调用 createElement，生成真实Dom

Vue 状态变化时进行以下几个操作：
+ state 生成新的VD
+ 旧的VD 和 新的VD进行对比
+ 生成差异对象patch
+ 遍历差异对象并更新 DOM

一个例子：
```
// virtual dom
{
    tag: "div",
    props: {},
    children: [
        "Hello World", 
        {
            tag: "ul",
            props: {},
            children: [{
                tag: "li",
                props: {
                    id: 1,
                    class: "li-1"
                },
                children: ["第", 1]
            }]
        }
    ]
}
```
调用 createElement，生成真实Dom
```
// 创建dom元素
function createElement(vdom) {
    // 如果vdom是字符串或者数字类型，则创建文本节点，比如“Hello World”
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return doc.createTextNode(vdom);
    }

    const {tag, props, children} = vdom;

    // 1. 创建元素
    const element = doc.createElement(tag);

    // 2. 属性赋值
    setProps(element, props);

    // 3. 创建子元素
    // appendChild在执行的时候，会检查当前的this是不是dom对象，因此要bind一下
    children.map(createElement)
            .forEach(element.appendChild.bind(element));

    return element;
}

// 属性赋值
function setProps(element, props) {
    for (let key in props) {
        element.setAttribute(key, props[key]);
    }
}
```

// 手写Virtual Domdiff
[Diff](https://segmentfault.com/a/1190000016186666)
[Diff](https://segmentfault.com/a/1190000016129036)

### Diff函数
+ 当节点类型相同时，去看一下属性是否相同 产生一个属性的补丁包 {type:'ATTRS', attrs: {class: 'list-group'}}
+ 新的dom节点不存在 {type: 'REMOVE', index: xxx}
+ 节点类型不相同 直接采用替换模式 {type: 'REPLACE', newNode: newNode}
+ 文本的变化：{type: 'TEXT', text: 1}

### 参考文档
[VDOM Diff](https://juejin.cn/post/6844903609667321863)