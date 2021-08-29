### 为什么要用Node？
    + 工程上来讲前端人员入手门槛低
    + 异步驱动，高并发，非阻塞，能承接请求，可作为密集I/O

### Node架构是什么样子的？
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/Node.png)   
主要分为三层
+ 应用App
+ V8及Node内置架构
    + V8是Node运行环境
    + 内置架构又可以分为三层
        + JS 实现
        + C++绑定
        + libuv + CAes + http
+ 原生模块

### 管道
```
管道的概念应运而生。目前在任何一个shell中，都可以使用“|”连接两个命令，shell会将前后两个进程的输入输出用一个管道相连，以便达到进程间通信的目的：

> [zorro@zorro-pc pipe]$ ls -l /etc/ | wc -l

对比以上两种方法，我们也可以理解为，管道本质上就是一个文件，前面的进程以写方式打开文件，后面的进程以读方式打开。这样前面写完后面读，于是就实现了通信。实际上管道的设计也是遵循UNIX的“一切皆文件”设计原则的，它本质上就是一个文件。Linux系统直接把管道实现成了一种文件系统，借助VFS给应用程序提供操作接口。


```

### Stream
+ 什么是Stream
    + 基于事件EventEmitter的数据管理模式，由不同的抽象接口组成，包括可读、可写、可转换
+ Stream 有什么好处
        + 非阻塞式处理提升效率，片段处理节省内存，管道处理方便可扩展
    + stream 有哪些典型应用
        + 文件、网络、数据转换、音视频
    + 怎么拨火Stream的错误事件
        + 监听error事件
    + 常用Stream
        + Readable为可被读流，在作为输入数据源时使用
        + Writable为可被写流,在作为输出源时使用
        + Duplex为可读写流,它作为输出源接受被写入，同时又作为输入源被后面的流读出
        + Transform机制和Duplex一样，都是双向流，区别时Transfrom只需要实现一个函数_transfrom(chunk, encoding, callback)
        + 而Duplex需要分别实现_read(size)函数和_write(chunk, encoding, callback)函数.

    + 实现一个WritabelStream
        + 构造函数 call Writable
        + 继承writable
        + 实现write


### Node 有哪些模块？
EventEmitter、Stream、FS、Net和全局对象


4. Node 有哪些全局对象
+ process
    + process.stdin
    + process.stdout
    + process.on
    + process.argv
+ console
    + console.log/console.info
+ Buffer
    + 处理二进制数据，比如图片，mp3，数据库文件，支持各种编解码，二进制字符串互换

5. Node 事件循环




7. 文件系统
    + 内置fs模块架构师什么样子
        + POSIX文件Wrapper,对应于操作系统的原生文件操作
        + 文件流 fs.createReadStream和fs.createWriteStream
        + 同步文件读写,fs.readFileSync和fs.writeFileSync
        + 异步文件读写, fs.readFile和fs.writeFile
    + 读写一个文件有多少种方法
        + POSIX式底层读写
        + 流式读写
        + 同步文件读写
        + 异步文件读写
    + 怎么读取json配置文件?
        + node内置的require('data.json')机制，直接得到js对象
        + 读入文件入内容，然后用JSON.parse(content)转换成js对象
    + fs.watch 和 fs.watchFile有什么区别，怎么应用
        二者主要用来监听文件变动．
        + fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统; 
        + fs.watchFile则是定期检查文件状态变更，适用于网络文件系统，但是相比fs.watch有些慢，因为不是实时机制

8. 网络
+ Node 网络模块架构什么样子的？
    + 全面支持各种网络服务器和客户端，包括  tcp, http/https, tcp, udp, dns, tls/ssl
+ Node 是怎样支持https、tls的？
    + openssl生成公钥
    + 服务器或客户端使用https替代http 
    + 服务端客户端加载公钥/私钥证书
```
var http = require('http'); // 加载http模块

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'}); // 200代表状态成功, 文档类型是给浏览器识别用的
	res.write('<meta charset="UTF-8"> <h1>我是标题啊！</h1> <font color="red">这么原生，初级的服务器，下辈子能用吗?!</font>'); // 返回给客户端的html数据
	res.end(); // 结束输出流
}).listen(3000); // 绑定3ooo, 查看效果请访问 http://localhost:3000
```

9. child-process
+ 为什么要有child-process?
    + 充分利用child的多核
+ exec
    + exec 用操作系统原生的方式执行各种命令，如管道 cat ab.txt | grep hello;
+ execFile
    + 执行一个文件
+ spawn
    + 流式和操作系统进行交互
+ fork
    + 两个Node进程之间交互
+ 实现spawn
```
var cp = require('child_process');
var child = cp.spawn('echo', ['你好', "钩子"]); // 执行命令
child.stdout.pipe(process.stdout); // child.stdout是输入流，process.stdout是输出流
// 这句的意思是将子进程的输出作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台

```
+ 两个node进程之间交互
    + fork
    + 原理是子程序用process.on, process.send，父程序里用child.on,child.send进行交互.
    ```
    	1) fork-parent.js
	var cp = require('child_process');
	var child = cp.fork('./fork-child.js');
	child.on('message', function(msg){
		console.log('老爸从儿子接受到数据:', msg);
	});
	child.send('我是你爸爸，送关怀来了!');

	2) fork-child.js
	process.on('message', function(msg){
		console.log("儿子从老爸接收到的数据:", msg);
		process.send("我不要关怀，我要银民币！");
	});
    ```
+ 怎样让一个js文件变得像Linux命令一样可直接执行
    + 在myCommand.js文件头部加入 #!/usr/bin/env node 
    + chmod命令把js文件改为可执行即可
    + 进入文件目录，命令行输入myComand就是相当于node myComand.js

+ child-process和process的stdin,stdout,stderror是一样的吗
    +  概念都是一样的，输入，输出，错误，都是流．区别是在父程序眼里，子程序的stdout是输入流，stdin是输出流．

+ 异步、部署、性能
+ node中的异步和同步怎么理解？
    + node是单线程的，异步是通过一次次的循环事件队列来实现的．同步则是说阻塞式的IO,这在高并发环境会是一个很大的性能问题，所以同步一般只在基础框架的启动时使用，用来加载配置文件，初始化程序什么的
+ 有哪些方法可以进行异步流程的控制?
    + 多层嵌套回调
    + 为每一个回调写单独的函数，函数里边再回调
    + 第三方框架promise，async/await

+ 怎么绑定Node到80 端口
    + sudo
    + apache/nginx代理 
    + 用操作系统的firewall iptables进行端口重定向
+ 有哪些方法可以让node程序遇到错误后自动重启
    + runit
    + forever
    + nohup npm start
+ 怎么充分利用多个CPU
    + cluster.js
+ 怎么调节Node执行单元内存的大小
    + --max-old-space-size
    + --max-new-space-size 
+ 程序总是崩溃，怎么找到问题在哪里
    + node --prof 查看哪些函数调用次数比较多
    + memwatch和heapdump获得内存快照进行对比，查找内存溢出
+ 如何防止内存崩溃
    + try-catch-finally
    + EventEmitter/Stream error事件处理
    + jshint静态检查
    + jasmine/mocha进行单元测试
+ 怎样调试node程序
    +  node --debug app.js 和node-inspector
+ 如何捕获NodeJS中的错误，有几种方法
    + 监听错误事件req.on('error', function(){}), 适用EventEmitter存在的情况
    + Promise.then.catch(error),适用Promise存在的情况
    + try-catch,适用async-await和js运行时异常，比如undefined object

9. 第三方类库
+ async
    + async.parallel并行执行完多个函数后，调用结束函数
    ```
    async.parallel([
	    function(){ ... },
	    function(){ ... }
	], callback);
    ```

    + async.series串行执行完多个函数后，调用结束函数
    ```
    async.series([
	    function(){ ... },
	    function(){ ... }
	]);

    ```
    + async.waterfall依次执行多个函数，后一个函数以前面函数的结果作为输入参数
    ```
    async.waterfall([
	    function(callback) {
	        callback(null, 'one', 'two');
	    },
	    function(arg1, arg2, callback) {
	      // arg1 now equals 'one' and arg2 now equals 'two'
	        callback(null, 'three');
	    },
	    function(arg1, callback) {
	        // arg1 now equals 'three'
	        callback(null, 'done');
	    }
	], function (err, result) {
	    // result now equals 'done'
	});
    ```
    + async.map异步执行多个数组，返回结果数组
    ```
    async.map(['file1','file2','file3'], fs.stat, function(err, results){
	    // results is now an array of stats for each file
	});
    ``` 
    + async.filter异步过滤多个数组，返回结果数组
    ```
    async.filter(['file1','file2','file3'], fs.exists, function(results){
	    // results now equals an array of the existing files
	});
    ```

+ Express
    + express常用函数
        +  express.Router路由组件,app.get路由定向，app.configure配置，app.set设定参数,app.use使用中间件
    + express中如何获取路由的参数
        +  /users/:name使用req.params.name来获取; 
        + req.body.username则是获得表单传入参数username; 
        + express路由支持常用通配符 ?, +, *, and ()
    + express response有哪些常用方法
    ```
    res.download() 弹出文件下载
    res.end() 结束response
    res.json() 返回json
    res.jsonp() 返回jsonp
    res.redirect() 重定向请求
    res.render() 渲染模板
    res.send() 返回多种形式数据
    res.sendFile 返回文件
    res.sendStatus() 返回状态
    ```
+ mongodb有哪些常用优化措施
    + 类似传统数据库，索引和分区．
+ mongoose是什么？有支持哪些特性?
    + mongoose是mongodb的文档映射模型．主要由Schema, Model和Instance三个方面组成．Schema就是定义数据类型，Model就是把Schema和js类绑定到一起，Instance就是一个对象实例．常见mongoose操作有,save, update, find. findOne, findById, static方法等．
+ redis支持哪些功能
    + set/get, mset/hset/hmset/hmget/hgetall/hkeys, sadd/smembers, publish/subscribe, expire
+ redis最简单的应用
    ```
    var redis = require("redis"),
	    client = redis.createClient();

	client.set("foo_rand000000000000", "some fantastic value");
	client.get("foo_rand000000000000", function (err, reply) {
	    console.log(reply.toString());
	});
	client.end();
    ```

    ### 文档
    ```
    https://www.jmjc.tech/less/111
    ```
