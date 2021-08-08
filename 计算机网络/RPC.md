> RPC就是要像调用本地函数一样调用远程函数
> 数据传输效率，安全性，可维护性
### 本地过程调用
本地调用例子：
```
int Multiply(int l, int r) {
   int y = l * r;
   return y;
}

int lvalue = 10;
int rvalue = 20;
int l_times_r = Multiply(lvalue, rvalue);
```

### PRC 调用
1. Call ID 映射
在 RPC 中，每个函数都有自己的函数 Call ID，客户端在调用函数时会传递这个 Call ID， 客户端和服务端都会维护 ID 和函数的映射

Call ID映射可以直接使用函数字符串，也可以使用整数ID。映射表一般就是一个哈希表。

2. 序列化和反序列化

本地调用直接从栈中读取压到栈里面的参数。

远程调用不同进程，不同语言。因此客户端需要把参数转成字节流，传给服务端，服务端再转成自己能读取的方式。

序列化反序列化可以自己写，也可以使用Protobuf或者FlatBuffers之类的。

3. 网络传输

大部分RPC传输利用TCP，也有使用UDP，Java的Natty也属于此列。

网络传输库可以自己写socket，或者用asio，ZeroMQ，Netty之类。

### 实现一个RPC框架

// Client端 
//    int l_times_r = Call(ServerAddr, Multiply, lvalue, rvalue)
1. 将这个调用映射为Call ID。这里假设用最简单的字符串当Call ID的方法
2. 将Call ID，lvalue和rvalue序列化。可以直接将它们的值以二进制形式打包
3. 把2中得到的数据包发送给ServerAddr，这需要使用网络传输层
4. 等待服务器返回结果
5. 如果服务器调用成功，那么就将结果反序列化，并赋给l_times_r

// Server端
1. 在本地维护一个Call ID到函数指针的映射call_id_map，可以用std::map<std::string, std::function<>>
2. 等待请求
3. 得到一个请求后，将其数据包反序列化，得到Call ID
4. 通过在call_id_map中查找，得到相应的函数指针
5. 将lvalue和rvalue反序列化后，在本地调用Multiply函数，得到结果
6. 将结果序列化后通过网络返回给Client
