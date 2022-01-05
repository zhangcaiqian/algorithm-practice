### 执行副作用
> 执行一段和当前执行结果无关的代码， 如修改函数外部某个变量，如发起一个请求
```
useEffect(callback, dependencies)
```

useEffect 是每次组件render完后判断依赖并执行就可以了。

1. 没有依赖项时，每次render后都会重新执行

2. 空数组作为依赖项，则只有首次执行时触发，对应到class组件就是componentDidmount

3. 返回函数，用于在组件销毁的时候做一些清理工作，执行类似于componentWillUnmount


### 依赖项
1. 依赖项变量用浅比较对比依赖项是否发生变化，特别注意数组或者对象类型