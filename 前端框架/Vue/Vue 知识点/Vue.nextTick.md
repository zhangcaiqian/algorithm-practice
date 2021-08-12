 > Vue 开启了一个队列，当你在 nextick 方法中改变数据的时候，视图层不会立马更新，而是要在下次的时间循环队列中更新。

 ### process.nextick 和 Vue.nextick 的区别
+ process.nextick: 每一次eventLoop执行之前，如果有多个process.nextick，则会影响下一次时间执行函数


> Vue.nextick  中每一次数据更新将作用到下一次数据更新

Vue 异步执行 DOM 的更新。当数据发生变化时，Vue会开启一个队列，缓存同一个事件循环中的所有数据的改变情况。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。

这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后在下一个的事件循环“tick”中。

例如：当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。

```

```