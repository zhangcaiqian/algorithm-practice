### 执行副作用
> 执行一段和当前执行结果无关的代码， 如修改函数外部某个变量，如发起一个请求
```
useEffect(callback, dependencies)
```

useEffect 是每次组件render完后判断依赖并执行就可以了。

1. 没有依赖项时，每次render后都会重新执行
```
useEffect(() => {
    // 每次render完重新执行
})
```

2. 空数组作为依赖项，则只有首次执行时触发，对应到class组件就是componentDidmount
```
useEffect(() => {
    //  组件首次渲染时执行
}, [])
```

3. 返回函数，用于在组件销毁的时候做一些清理工作，执行类似于componentWillUnmount


### 依赖项
1. 依赖项变量用浅比较对比依赖项是否发生变化，特别注意数组或者对象类型

### HOOKS 使用规则
1. 只能在顶级作用域使用

### 在类组件中使用Hooks
利用高阶组件的模式，将Hooks封装成高阶组件，让类组件使用

已经定义定义监听窗口大小的Hooks：useWindowSize，将其转成高阶组件


```
import React from 'react';
import { useWindowSize } from './hooks/useWindowSize';

export const withWindowSize = (Comp) => {
    return props => {
        const windowSize = useWindowSize();
        return <Comp windowSize={windowSize} {...props}/>
    }
}
```

高阶组件的使用

```
import React from 'react';
import { withWindowSize } from './withWindowSize';

class MyComp {
    render () {
        const { windowSize } = this.props;
    }
}

export default withWindowSize(MyComp);

```

