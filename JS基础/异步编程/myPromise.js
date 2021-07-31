const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

// 决议promise
function resolvePromise (promise2, value, resolve, reject) {
    // 为了防止promise 既可以调resolve 又可以调reject
    let called;
    // 如果循环引用则通过reject抛出错误
    if (value == promise2)
        reject(new TypeError('Chaining cycle detected for promise'))
    // 如果 value 处于pending，promise需保持等待状态直至value被执行或拒绝
    // 如果value处于其他状态，则用相同的值处理promise
    if (value && typeof value === 'object' || typeof value === 'function') {
        try {
            let then = value.then
            if (typeof then == 'function') {
                then.call(value,
                    // 定义如何展开这个promise
                    // 内部给then方法自定义了onFullfilled/onRejected 函数，规定处理逻辑
                    function onFulfilled (res) {
                        if (called) return;
                        called = true;
                        // 递归调用直至resolvePromise 直到传入的value不是promise对象为止
                        // 传递promise2 是通过闭包保留promise2 ，防止后续循环引用
                        console.log(">>>resolvePromise", value);
                        resolvePromise(promise2, res, resolve, reject)
                    }, 
                    function onRejected (err) {
                        if (called) return;
                        called = true;
                        reject(err);
                    }
                )
            }
            else {
                // 是一个对象但没有 then 方法则直接决议
                console.log(">>>resolvePromise", value);
                resolve(value)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    }
    else {
        resolve(value)
    }
}
class myPromise
{
    constructor (fn) {
        let resolve = res => {
            // resolve 方法只能在pending状态调用，且决议后不可改变
            if (this.status == PENDING) {
                this.status = RESOLVED
                this.value = res
                // 调用resolve后遍历之前then方法放入的回调，并执行
                this.resolvedCallbacks.map(cb => cb())
            }
        }
        let reject = err => {
            // 调用 reject 方式只能在pending状态
            if (this.status == PENDING) {
                this.status = REJECTED
                this.value = err
                this.rejectedCallbacks.map(cb => cb())
            }
        }
        this.status = PENDING
        this.value = undefined

        // 存储多个 then 方法时返回的所有回调
        // promise.then(res1 => {代码1...})
        // promise.then(res2 => {代码2...})
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];

        try {
            fn(resolve, reject);
        } catch (e) {
            // 任何可能的报错都要执行reject
            reject(e)
        }
    }

    then (onFulfilled, onRejected) {
        // 如果then参数不是function就使用默认函数向后传递 promise 链
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : res => res
        onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }

        // 将then/catch 的返回值包装成一个promise，因为then/catch 最终返回也是一个promise
        let promise2 = new myPromise((resolve, reject) => {
            switch (this.status) {
                case PENDING: {
                    // 如果 promise 还没有决议，则将对应的回调放入数组存储，等待resolve/reject执行后将回调放入微任务队列
                    // 这里的回调必须异步调用，规范中当一个promise被决议后，保存的callback必须异步执行
                    // 对于pending状态的promise，then方法会同步执行注册回调，异步执行回调
                    // （pending对比其他状态，then方法是异步解析promise
                    this.resolvedCallbacks.push(
                        () => {
                            setTimeout(() => {
                                try {
                                    let res = onFulfilled(this.value)
                                    console.log(">>>pengding this.value:", this.value);
                                    resolvePromise(promise2, res, resolve, reject)
                                } catch (e) {
                                    reject(e)
                                }
                            })
                        }
                    )
                    this.rejectedCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                let err = onRejected(this.value)
                                resolvePromise(promise2, err, resolve, reject)
                            } catch (e) {
                                reject(e)
                            }
                        });
                    })
                    break;
                }
                case RESOLVED: {
                    // then 方法解析状态微resolve/reject 的 promise的值后，会将解析的值作为回调函数的参数将回调函数放入微任务队列中
                    // JS 引擎会通过EventLoop在当前宏任务完成后自动处理微任务队列中的任务
                    // 因浏览器限制，这里使用settimeout 模拟微任务
                    setTimeout(() => {
                        try {
                            // 首先执行用户定义的onFulfilled 代码，将返回值赋给res
                            let res = onFulfilled(this.value)
                            console.log(">>>resolved this.value:", this.value);
                            resolvePromise(promise2, res, resolve, reject)
                        } catch (e) {
                            // 如果在onFullfilled/onRejected 中发生了异常，用异常信息作为值，将promise2的状态变为rejected
                            reject(e)
                        }
                    });
                    break;
                }
                case REJECTED: {
                    setTimeout(() => {
                        try {
                            let res = onRejected(this.value)
                            resolvePromise(promise2, res, resolve, reject)
                        } catch (e) {
                            console.log(e)
                            reject(e)
                        }
                    });
                    break;
                }
            }
        })
        console.log(">>>promise: ", promise2)
        // then/catch 始终返回一个promise
        return promise2
    }

    catch (onRejected) {
        return this.then(null, onRejected)
    }
   
}