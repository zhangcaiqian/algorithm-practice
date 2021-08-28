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
  + 非阻塞式数据处理提升效率，片段时式处理节省内存，管道式处理方便扩展
+ 怎么捕获Error事件
  + 监听error事件，方法同EventEmitter
+ 有哪些常用的Stream，分别什么时候使用
  + Readable 只读
  + Writable 只写
  + Transform 双向
  + Duplex 双向


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
存放数据的二进制数据容器，可作为缓冲区，用于数据的缓存
```
var buf = Buffer.alloc(10) // 定义一个10字节的 Buffer
buf.write('hell0') // 缓存数据

console.log(buf) // <Buffer 2e 2e 2e 00 00 00 00 00 00 00>
console.log(buf.toString()) // hell0
```


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

### child-process
Node 异步非阻塞

可以用 child-process 把Node阻塞的工作交给子进程去做

多进程分发策略，主进程接收所有请求，通过负载均衡策略分发到不同Node.js进程中。
主进程监听不同端口，通过主进程分发请求到子进程。

exec、execFile、spawn、fork

exec可以用操作系统原生的方式执行各种命令，如管道 cat ab.txt | grep hello; execFile是执行一个文件; spawn是流式和操作系统进行交互; fork是两个node程序(javascript)之间时行交互.

+ 实现简单的命令行交互
```
var cp = require('child_process');
var child = cp.spawn('echo', ['你好', "钩子"]); // 执行命令
child.stdout.pipe(process.stdout); // child.stdout是输入流，process.stdout是输出流
// 这句的意思是将子进程的输出作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台
```

### 参考文档
[简介版](https://www.jmjc.tech/less/114)
[官方版](http://nodejs.cn/api/http2.html)