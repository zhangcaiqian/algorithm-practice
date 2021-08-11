1. 对于普通的 promise 来说，当执行完 resolve 函数时，promise 状态就为 resolved
2. 对于 then 方法返回的 promise 它是没有 resolve 函数的，
    只要 then 中回调的代码执行完毕并获得同步返回值，这个 then 返回的 promise 就算被 resolve

```
new Promise(resolve => {
  resolve();
})
  .then(() => {
    new Promise(resolve => {
      resolve();
    })
      .then(() => {
        console.log("log: 内部第一个then");
        return Promise.resolve();
      })
      .then(() => console.log("log: 内部第二个then"));
  })
  .then(() => console.log("log: 外部第二个then"));
  
  // log: 内部第一个then
  // log: 外部第二个then
  // log: 内部第二个then

```
1. 首先 Promise 实例化时，同步执行函数，打印 log: 外部promise，
然后执行 resolve 函数，将 promise 变为 resolved，但由于此时 then 方法还未执行，所以遍历所有 then 方法注册的回调时什么也不会发生（结论2第一条）
> 主线程： 外部第一个then，外部第二个then
> 微队列：空

2. 接着执行第一个外部then，此时第一个promise已经resolve，所以第一个外部then的回调被放入到微队列
> 主线程：外部then2
> 微队列：外then1 的回调

外1then 返回的 promise 仍为 pending 状态，所以外部then2 的回调不会进入微队列也不会执行

3. 当主线程执行完毕后，执行微任务，也就是外1then 的回调，回调中首先 打印log: 外部第一个then

4. 然后执行外then1 回调，实例化内部then，打印log: 内部promise
并执行构造函数的resolve 函数（结论1）
5. 接着执行到内部的第一个 then（以下简称:内1then），因为内部then的状态是resolved，所以直接将内部then1回调放入微任务队列中
> 主线程： 主线程：内2then
> 微队列： 内then1 回调

6. 接着同步执行内2then,它前面的内then1 返回 的promise 仍然是pending，内then2不注册不执行
> 主线程：空
> 微任务队列：内1then 的回调
7. 此时外1then 的回调全部执行完毕，外1then 返回的 promise 的状态由 pending 变为 resolved，同时遍历之前通过 then 给这个 promise 注册的所有回调，将它们的回调放入微任务队列中（结论2），即放入外2then 的回调

> 主线程：空
微任务：内1then回调，内2then回调

### Promise 实现Promise.all
```
function promiseAll (promiseArr) {
    if (!Array.isArray(promiseArr)) {
        return "参数为数组"
    }
    return new Promise(function(resolve, reject) {
        let resolveValues = []
        let resolveCount = 0
        for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(function(res) {
                console.log("res: ", res)
                resolveCount ++
                resolveValues[i] = res
                if (resolveCount == promiseArr.length)
                    resolve(resolveValues)
            }, function(err) {
                reject(err)
            })
        }
    })
}
```

### setTimout promisify化
将setTimeout封装成promise名为delay，调用形式如下
delay(ms).then(() => console.log('print after ms'))
```
function delay (ms) {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve()
        }, ms);
    })
delay(2000).then(() => console.log('print after ms'))
```
### 串行promise
function linePromise (promiseArr, i) {
    if (!Array.isArray(promiseArr)) {
        return "参数为数组"
    }
    return new 
}
