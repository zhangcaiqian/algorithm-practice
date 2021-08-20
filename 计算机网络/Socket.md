### 定义
+ 一套用于不同主机间通信的API
+ 工作在TCP/IP 协议层中
+ SSH、图形渲染

+ 基于TCP 连接的全双工协议，支持客户端服务端双向通信
+ 允许服务端主动向客户端推送数据
+ 浏览器和服务器只需要一个握手动作，就形成一条快速通道，两者之间就可以数据互相传送

### Socket 连接
+ 只需要指定主机的 IP 地址 和 端口号
+ 区分数据发送到哪一个应用上

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/websocket.png)

+ socket在不同主机之间不同应用的虚拟数据通道
+ 端口用来区分不同的应用

### TCP 和 UDP
+ TCP 是可靠的，底层自动检测并回传丢失的数据包
+ 顺序一致（基于数据流）
+ 俩个角色 服务器/客户端

+ UDP 不可靠，不会回传丢失的数据包
+ 更低的延迟并占用更少的系统资源
+ 报文

### Socket.io 文档
[文档](https://socket.io/docs/v3/server-api/index.html)

### 请求头和返回头
```
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: Upgrade
Host: localhost:3002
Origin: http://localhost:3002
Pragma: no-cache
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: ovv/5Eehx5xZATgU2Av4qA==
Sec-WebSocket-Version: 13
Upgrade: websocket
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36
```
```
Connection: Upgrade
Sec-WebSocket-Accept: dOV1w5K5vmsGIHTQUalJeb04Wlg=
Upgrade: websocket
```
关键信息：
> Connection: Upgrade
> Upgrade: websocket

### 帧数据
WebSocket协议使用帧（Frame）收发数据,在控制台->Frames中可以查看发送的帧数据。

Packet type id> [<data>]

+ 0 open——在打开新传输时从服务器发送（重新检查）
+ 1 close——请求关闭此传输，但不关闭连接本身。
+ 2 ping——由客户端发送。服务器应该用包含相同数据的乓包应答

+ 客户端发送：2probe探测帧
3 pong——由服务器发送以响应ping数据包。

服务器发送：3probe,响应客户端
+ 4 message——实际消息，客户端和服务器应该使用数据调用它们的回调。
+ 5 upgrade——在engine.io切换传输之前，它测试，如果服务器和客户端可以通过这个传输进行通信。如果此测试成功，客户端发送升级数据包，请求服务器刷新其在旧传输上的缓存并切换到新传输。
+ 6 noop——noop数据包。主要用于在接收到传入WebSocket连接时强制轮询周期。

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/socketview.png)

具体执行步骤：
+ connect握手成功
+ 客户端会发送2 probe探测帧
+ 服务端发送响应帧3probe
+ 客户端会发送内容为5的Upgrade帧
+ 服务端回应内容为6的noop帧
+ 探测帧检查通过后，客户端停止轮询请求，将传输通道转到websocket连接，转到websocket后，接下来就开始定期(默认是25秒)的 ping/pong
+ 客户端、服务端收发数据，4表示的是engine.io的message消息，后面跟随收发的消息内容

该心跳定期发送的间隔是socket.io默认设定的25m，在上图中也可观察发现。该间隔可通过配置修改。

### 小的实践链接
[link](https://github.com/xiguatailangmaixigua/testSocket)