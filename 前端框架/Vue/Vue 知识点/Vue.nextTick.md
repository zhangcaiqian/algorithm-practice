 > Vue 开启了一个队列，当你在 nextick 方法中改变数据的时候，视图层不会立马更新，而是要在下次的时间循环队列中更新。

 ### process.nextick 和 Vue.nextick 的区别
+ process.nextick: 每一次eventLoop执行之前，如果有多个process.nextick，则会影响下一次时间执行函数
+  Vue.nextick  中每一次数据更新将作用到下一次数据更新