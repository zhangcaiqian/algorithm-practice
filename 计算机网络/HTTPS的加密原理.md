HTTPS是HTTP协议的安全版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用了SSL/TLS协议进行了加密处理，相对更安全
HTTP 和 HTTPS 使用连接方式不同，默认端口也不一样，HTTP是80，HTTPS是443
HTTPS 由于需要设计加密以及多次握手，性能方面不如 HTTP
HTTPS需要SSL，SSL 证书需要钱，功能越强大的证书费用越高

// TODO:
① 证书验证阶段

1. 浏览器发起 HTTPS 请求
2. 服务端返回 HTTPS 证书
3. 客户端验证证书是否合法，如果不合法则提示告警

② 数据传输阶段

1. 当证书验证合法后，在本地生成随机数

2. 通过公钥加密随机数，并把加密后的随机数传输到服务端

3. 服务端通过私钥对随机数进行解密

4. 服务端通过客户端传入的随机数构造对称加密算法，对返回结果内容进行加密后传输