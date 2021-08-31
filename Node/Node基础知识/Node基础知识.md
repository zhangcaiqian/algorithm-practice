### 为什么使用Node
  + 工程上来讲前端人员入手门槛低
  + 异步驱动，高并发，非阻塞，能承接请求，可作为密集I/O
### Node 整体架构
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/Node.png)  
主要分为3层
+ 应用层
+ Node内置层
  + JS核心
  + C++绑定
  + libuv + Async IO + eventnoop
+ 原生层

### 中间件概念
+ 中间件
  + 执行任何代码。
  + 对请求和响应对象进行更改。
  + 结束请求/响应循环。
  + 调用堆栈中的下一个中间件。


### 管道
管道的概念：目前在任何一个shell中，都可以使用“|”连接两个命令，shell会将前后两个进程的输入输出用一个管道相连，以便达到进程间通信的目的：

> [zorro@zorro-pc pipe]$ ls -l /etc/ | wc -l

对比以上两种方法，我们也可以理解为，管道本质上就是一个文件，前面的进程以写方式打开文件，后面的进程以读方式打开。这样前面写完后面读，于是就实现了通信。实际上管道的设计也是遵循UNIX的“一切皆文件”设计原则的，它本质上就是一个文件。Linux系统直接把管道实现成了一种文件系统，借助VFS给应用程序提供操作接口。

```
var fs = require('fs')
var rs = fs.createReadStream('test.txt') // 输出流
var ws = fs.createWriteStream('b.txt') // 输入流
rs.pipe(ws) // 输出通过管道流向输入
```

### Stream
+ 流 是一种抽象的概念，它表示的含义是，文件的传输，就像水流一样，通过 管道 一点一点的传向目的地。流的背后，是一个又一个的 缓冲区，提前为数据做好了准备。

与fs不同， Stream 的理念是 边读边取，用这种 IO 方式节省空间和时间

+ 基于EventEmitter的数据管理模式

+ 流的好处
  + 非阻塞式数据处理提升效率，片段式处理节省内存，管道式处理方便扩展
+ 怎么捕获Error事件
  + 监听error事件，方法同EventEmitter
+ 有哪些常用的Stream，分别什么时候使用
  + Readable 只读 fs.createReadStream() 
  + Writable 只写 fs.createWriteStream() 
  + Transform 双向 net.Socket
  + Duplex 双向
  ```
  const server = http.createServer(function (req, res) {
      const method = req.method; // 获取请求方法
      if (method === 'GET') { // get 请求
          const fileName = path.resolve(__dirname, 'data.txt');
          let stream = fs.createReadStream(fileName);
          stream.pipe(res); // 将 res 作为 stream 的 dest
      }
  });
  server.listen(8000);
  ```
  + 应用
  目前一些比较火的前端打包构建工具，都是通过node.js编写的，打包和构建的过程肯定是文件频繁操作的过程，离不来stream，如gulp




### HTTP 模块
让Node构建HTTP 服务器。支持TCP、HTTP/HTTPS、TCP、UDP、DNS、TLS/SSL

```
var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<h1>Hello world</h1>')
})

server.listen(4000, () => {
    console.log('server start http://127.0.0.1:4000');
});
```

### https
基于TLS/SSL的HTTP协议
```
// curl -k https://localhost:8000/
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

### http2
http2 超文本传输协议2.0
```
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```

### FS 模块
#### global 
global 是 Node.js 的 全局对象，相当于 Javascript 中的window
```
// global 包含了当前环境的很多信息
consoel.log(global) 

// 当前文件名称
global.__filename

// 当前目录名称
global.__dirname
```

#### path 
路径处理模块
```
var path = require('path')

// 格式化
var normalizeRes = path.normalize('c:/user') // c:|user ｜针对window操作系统文件路径
console.log('normalizeRes:', normalizeRes);
// 路径解析
var parseRes = path.parse('/Users/json/test')
console.log('parseRes:', parseRes)
/**
 *  { root: '/', dir: '/Users/json', base: 'test', ext: '', name: 'test'
 */

// 路径拼接
var joinRes = path.join('/Users', 'jsaon/Desktop')
console.log('joinRes:', joinRes)

```
#### url
网址处理模块
```
var url = require('url')

// 解析
url.parse('https://www.jmjc.tech/less/109')

/*
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.jmjc.tech',
  port: null,
  hostname: 'www.jmjc.tech',
  hash: null,
  search: null,
  query: null,
  pathname: '/less/109',
  path: '/less/109',
  href: 'https://www.jmjc.tech/less/109' }
*/
```

#### fs
文件处理模块
+ POSIX 原生文件读写
+ 文件流 fs.createReadStream 和fs.createWriteStream
+ 同步文件读写 fs.readFileSync 和 fs.writeFileSync 
+ 异步文件读写 fs.readFile 和 fs.writeFile

### Buffer
存放数据的二进制数据容器，可作为缓冲区，用于数据的缓存（初次初始化为8KB）

```
var buf = Buffer.alloc(10) // 定义一个10字节的 Buffer
buf.write('hell0') // 缓存数据

console.log(buf) // <Buffer 2e 2e 2e 00 00 00 00 00 00 00>
console.log(buf.toString()) // hell0
```
+ 应用
  + I/O操作
  + 加解密
  + zlib.js


### cypto
crypto模块 是 Node.js 内置的密码模块，封装了一些密码处理方法

+ 对称加密
  + 支持加解密的，通过配备一个 密钥 完成。AES 是对称加密的一种，常见算法有 aes192、aes-128-ecb、aes-256-cbc。

```
const crypto = require('crypto')

// 加密
function aesEncrypt(data, key) {
  let cipher = crypto.createCipher('aes192', key)
  let crypted = cipher.update(data, 'utf8', 'hex')
  return cipher.final('hex')
}

// 解码
function aesDecrypt(encrypt, key) {
  let decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypt, 'hex', 'utf8');
  return decipher.final('utf8');
}

let encrypt = aesEncrypt('data','key') // 加密
console.log(encrypt) // 998118c1207f9e6fa5ee610c5bfd8ef0

let data = aesDecrypt(encrypt, 'key') // 解密
console.log(data) // data
```

### mysql
第三方数据模块，需要提前安装
```
const mysql = require('mysql')

// 连接 mysql 服务器
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: ''
})

// 执行SQL
connection.query(sql, function (err, result) {
  err // 错误信息
  result // 结果
})

// 销毁连接 | 由于 JS 是异步的，所以当前代码会在执行 SQL 之前就销毁了连接
connection.destroy()
```
### Process模块
提供了有关当前 Node.js进程的信息并对其进行控制

+ process.env：环境变量，例如通过 `process.env.NODE_ENV 获取不同环境项目配置信息
+ process.nextTick：这个在谈及 EventLoop 时经常为会提到
+ process.pid：获取当前进程id
+ process.ppid：当前进程对应的父进程
+ process.cwd()：获取当前进程工作目录
+ process.argv 可以获取传入的命令行参数
+ Process.nextTick 下一个事件轮询的时间点上执行
```
function foo() {
    console.error('foo');
}

process.nextTick(foo);
console.error('bar');
```
```
setTimeout(foo, 0);
console.log('bar');
```
process.nextTick()会在这一次event loop的call stack清空后（下一次event loop开始前）再调用callback
setTimeout()是并不知道什么时候call stack清空的，所以何时调用callback函数是不确定的

### Node查找文件
+ 缓存的模块优先级最高

+ 如果是内置模块，则直接返回，优先级仅次缓存的模块

+ 如果是绝对路径 / 开头，则从根目录找

+ 如果是相对路径 ./开头，则从当前require文件相对位置找

+ 如果文件没有携带后缀，先从js、json、node按顺序查找

+ 如果是目录，则根据 package.json的main属性值决定目录下入口文件，默认情况为 index.js

+ 如果文件为第三方模块，则会引入 node_modules 文件，如果不在当前仓库文件中，则自动从上级递归查找，直到根目录


### child-process
Node 异步非阻塞

可以用 child-process 把Node阻塞的工作交给子进程去做

多进程分发策略，主进程接收所有请求，通过负载均衡策略分发到不同Node.js进程中。
主进程监听不同端口，通过主进程分发请求到子进程。

exec、execFile、spawn、fork

exec可以用操作系统原生的方式执行各种命令，如管道 cat ab.txt | grep hello; execFile是执行一个文件; spawn是流式和操作系统进行交互; fork是两个node程序(javascript)之间时行交互.
child_process.exec(): 衍生 shell 并在该 shell 中运行命令，完成后将 stdout 和 stderr 传给回调函数。
child_process.execFile(): 与 child_process.exec() 类似，不同之处在于，默认情况下，它直接衍生命令，而不先衍生 shell。
child_process.fork(): 衍生新的 Node.js 进程并使用建立的 IPC 通信通道（其允许在父子进程之间发送消息）调用指定的模块。
child_process.execSync(): child_process.exec() 的同步版本，其将阻塞 Node.js 事件循环。
child_process.execFileSync(): child_process.execFile() 的同步版本，其将阻塞 Node.js 事件循环。

+ 实现简单的命令行交互
```
var cp = require('child_process');
var child = cp.spawn('echo', ['你好', "钩子"]); // 执行命令
child.stdout.pipe(process.stdout); // child.stdout是输入流，process.stdout是输出流
// 这句的意思是将子进程的输出作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台
```

### JWT
本质就是一个字符串书写规范，如下图，作用是用来在用户和服务器之间传递安全可靠的信息
+ 服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌，这个令牌作为后续用户访问一些接口的凭证
+ 后续访问会根据这个令牌判断用户时候有权限进行访问

+ Token，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以.进行拼接。其中头部和载荷都是以JSON格式存放数据
+ Signature = HMACSHA256(base64Url(header)+.+base64Url(payload),secretKey)

### CPU 负载和优化
+ 内存指标：
内存占有率和内存堆的指标
```
// /app/lib/memory.js
const os = require('os');
// 获取当前Node内存堆栈情况
const { rss, heapUsed, heapTotal } = process.memoryUsage();
// 获取系统空闲内存
const sysFree = os.freemem();
// 获取系统总内存
const sysTotal = os.totalmem();

module.exports = {
  memory: () => {
    return {
      sys: 1 - sysFree / sysTotal,  // 系统内存占用率
      heap: heapUsed / headTotal,   // Node堆内存占用率
      node: rss / sysTotal,         // Node占用系统内存的比例
    }
  }
}
```
+ CPU使用率：CPU时间占用状况，等于 1 - 空闲CPU时间(idle time) / CPU总时间

### 参考文档
[简介版](https://www.jmjc.tech/less/114)
[官方版](http://nodejs.cn/api/http2.html)