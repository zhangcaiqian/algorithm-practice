### 理念
npm 处于V3时期，yarn为解决npm的不足（依赖一致性，安装速度慢）出现。具有：

+ 确定性
    +  相同的依赖关系，在任何环境下都被相同地安装
+ 模块扁平安装
    + 将依赖包的不同版本，按照一定策略归结为单版本，以避免创建多个版本造成冗余（现npm也有类似优化）
+ 网络性能更好
    + 请求排队并且有更好的失败重试策略
+ 缓存机制
    + 缓存机制，实现了离线模式

对于包管理工具npm 和 yarn，可以相互转换，甚至有 synp  工具将yarn.lock 转成package-lock.json

### 安装机制
检测（checking） ——> 解析包（resolving package） ——> 获取包（fetching package） ——> 链接包（linking package）——> 构建包（building package）

+ 检测包
    + 检测是否有npm文件如package-lock.json ，如果有则提示用户注意，同时检测 OS、CPU等信息
+ 解析包
    + 首先获取当前项目中 package.json 定义的 dependencies、devDependencies、optionalDependencies 的内容，这属于首层依赖。
    + 接着采用遍历首层依赖的方式获取依赖包的版本信息，以及递归查找每个依赖下嵌套依赖的版本信息，并将解析过和正在解析的包用一个 Set 数据结构来存储，这样就能保证同一个版本范围内的包不会被重复解析。
    + 对于yarn.lock 里的包，set里包标记为已解析，没有相关版本，Registry 发起请求获取满足版本范围的已知最高版本的包信息

+ 获取包
    + ![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/yarn包下载.png)
+ 链接包
    + 上一步是将依赖下载到缓存目录，这一步是将项目中的依赖复制到项目 node_modules 下，同时遵循扁平化原则
    + ![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/yarn链接包.png)
+ 构建包
    + 如果依赖包中存在二进制包需要进行编译，会在这一步进行。