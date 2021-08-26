### BFF网关（Backend For Fronted）
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/BFF.png)
### 需要考虑的问题
+ 数据处理
    + 数据聚合和裁剪
    + 序列化格式转换
    + 协议转换
    + 调用RPC
+ 流量处理
    + 请求分发能力、代理能力
        + http-proxy
        + 网关层维护/分发路由
            + hard-coding
            + 考虑网关层的服务发现
                + URL 根据不同namespace匹配到不同微服务
                + 去中心化配置，通过配置来维护网关层路由分发
            + 同时具有良好的限速、隔离、熔断降级、负载均衡和缓存
    + 可用性保障
+ 安全问题
    + 不需要完成全部的校验逻辑，部分业务校验可以放到微服务中
    + 必要的检查
        + 头部检查和必要的数据消毒
    + 合理使用 Content-Security-Policy
    + 使用 HTTPS/HSTS
    + 设置监控报警及调用链追踪
    + 依赖包的安全性，在CI/CD环节使用nsq、npm audit 等工具
+ 权限认证
    + 支持基于 cookie 或 token 的身份验证
    + SSO单点登录

### 实践
+ 依赖
    + fast-proxy：支持HTTP、HTTPS、HTTP2三种协议，高性能请求转发、代理
    + @polka/send-type：处理HTTP响应的工具函数
    + http-cache-middleware：是一个高性能的 HTTP 缓存中间件
    + restana：一个极简的 REST 风格的 Node.js 框架
### 主要部分
+ 反代理
+ 中间件
    + 性质：中间件是软件。
    + 作用层级：系统软件和应用软件之间、软件各部件之间；管理客户机与系统软件之间的计算资源和网络通信。
    + 服务对象：中间件为应用软件服务，应用软件为最终用户服务，最终用户并不直接使用中间件。 
+ 缓存
+ Hooks
    + 以 Hooks 的方式，允许开发者介入网关处理流程