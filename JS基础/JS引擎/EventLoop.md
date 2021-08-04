> 浏览器端的 Eventloop 起到了什么作用
> Node.js 服务端的 Eventloop 的作用

### 浏览器的 Eventloop
EventLoop是实现异步编程的基础。

##### Eventloop 中的基础概念
+ 调用堆栈
    + 负责跟踪所有要执行的代码，函数执行完成时，从堆栈中pop该执行函数，代码要进去执行，则push进去
+ 事件队列
    + 负责将新的function发送到队列中进行处理
    
1. JavaScript 语言本身是单线程的，而浏览器 API 充当单独的线程。EventLoop 会不断检查调用堆栈是否为空，如果为空，它会不断检查调用堆栈是否为空。如果为空，则从事件队列中添加新的函数进入调用栈（call stack），如果不为空，则处理当前函数的调用。
2. 每当调用异步函数时，都会将其发送到对应的API，异步函数执行完成后将发送到事件队列。
3. Eventloop 内部有俩个队列来处理放进去的异步任务，一个是宏任务队列，一个是微任务队列。
4. 一次 Eventloop 循环会处理一个宏任务和在此次循环过程中产生的微任务。

![测试](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/eventloop.png)

Eventloop 通过内部两个队列来实现 Event Queue 放进来的异步任务。
+ macro task 宏任务
    + script(整体代码),setTimeout,setInterval,setImmediate,I/O,UI rendering,event listner
+ micro task 微任务
    + process.nextTick, Promises, Object.observe, MutationObserver

执行顺序：
+ JS引擎从宏任务队列取出第一个任务，
+ 执行完毕后将微任务全部取出，按顺序全部执行，如果在这一步中产生微任务，也需要执行
+ 然后再从宏任务队列中取下一个，执行完毕后，再次将 microtask queue 中的全部取出，循环往复，直到两个 queue 中的任务都取完。

**「一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务。」**

### Node.js 的 Eventloop
// TODO:

