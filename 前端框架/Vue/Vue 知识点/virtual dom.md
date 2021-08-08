> Virtual Dom 是一个简单的 JS 对象，并且包含tag，props，children 等属性

+ 将页面的对象抽象成JS的形式，配合不同渲染工具，使得跨平台成为可能。
+ 可以在内存中进行比较，将多次对比结果一次性更新，减少渲染次数。

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