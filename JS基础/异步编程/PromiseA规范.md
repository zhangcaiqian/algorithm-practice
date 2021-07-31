### Promise A 的规范
规范地址： https://promisesaplus.com/
+ Promise 将有三种状态：pending、fulfilled、rejected
+ 当状态是pending时，可以转为fulfilled和rejected
+ 当状态为 fulfilled 或rejected 状态时，就不能转换为其他状态了，必须返回一个不能再改变的值。
+ then 方法有onFulfilled 和 onRejected
+ then 调用时返回promise

### 实现Promise
Promise 构造函数接收一个executor函数，executor函数执行完后调用resolve和reject中。
+ 定义一个 Promise 的初始状态 pending
+ 定义参数执行函数 executor
+ 定义一个 resolve 回调函数集合数组 onResolvedCallback 以及 一个 reject 回调函数集合数组 onRejectedCallback

+ resolve 和 reject 内部的实现:
    + 返回对应的 value 和 reason
    + 调用 onRejectedCallback 或 onResolvedCallback

### 实现then
then 方法是 Promise 执行完之后可以拿到 value 或者 reason 的方法，并且还要保持 then 执行之后，返回的依旧是一个 Promise 方法，还要支持多次调用（上面标准中提到过）。

实现见同目录下myPromise.js



