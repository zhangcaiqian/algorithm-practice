开篇问题列表：
* 我们的应用依赖了公共库 A 和公共库 B，同时公共库 A 也依赖了公共库 B，那么公共库 B 会被多次安装或重复打包吗？

### npm 安装机制和内部思想

优先安装依赖包到当前项目目录，使得不同应用项目的依赖各成体系，减轻兼容压力。

如果我们的项目 A 和项目 B，都依赖了相同的公共库 C，那么公共库 C 一般都会在项目 A 和项目 B 中，各被安装一次。这就说明，同一个依赖包可能在我们的电脑上进行多次安装。

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/npm%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96.png)

1. npm install 执行之后，首先，检查并获取 npm 配置，这里的优先级为：项目级的 .npmrc 文件 > 用户级的 .npmrc 文件> 全局级的 .npmrc 文件 > npm 内置的 .npmrc 文件。
2. 然后检查项目中是否有 package-lock.json 文件。如果有，则检查 package-lock.json 和 package.json 中声明的依赖是否一致：

    一致，直接使用 package-lock.json 中的信息，从缓存或网络资源中加载依赖；

    不一致，按照 npm 版本进行处理（不同 npm 版本处理会有不同，具体处理方式如图所示）。

如果没有，则根据 package.json 递归构建依赖树。然后按照构建好的依赖树下载完整的依赖资源，在下载时就会检查是否存在相关资源缓存：

存在，则将缓存内容解压到 node_modules 中；

否则就先从 npm 远程仓库下载包，校验包的完整性，并添加到缓存，同时解压到 node_modules。

最后生成 package-lock.json。


** 注意：npm 在package.json 和 package-lock.json版本不一致时的处理和版本有关系，因此同一项目团队npm版本最好一致 ** 

### npm执行原理
依靠npm run xxx来执行一个 npm scripts，那么核心奥秘就在于npm run了。npm run会自动创建一个 Shell（实际使用的 Shell 会根据系统平台而不同，类 UNIX 系统里，如 macOS 或 Linux 中指代的是 /bin/sh， 在 Windows 中使用的是 cmd.exe），我们的 npm scripts 脚本就在这个新创建的 Shell 中被运行。

### npm缓存机制
npm 对于一个依赖包的同一版本进行本地化缓存。
```
npm config get cache
```
缓存在/Users/[用户目录]/.npm/_cacache

* npm 在下载依赖时，先下载到缓存当中，再解压到项目 node_modules 下
* 在每次安装资源时，根据 package-lock.json 中存储的 integrity、version、name 信息生成一个唯一的 key，这个 key 能够对应到 index-v5 目录下的缓存记录。如果发现有缓存资源，就会找到 tar 包的 hash，根据 hash 再去找缓存的 tar 包，并再次通过pacote把对应的二进制文件解压到相应的项目 node_modules 下面，省去了网络下载资源的开销。

### 自定义 npm init
功能：调用shell版本生成一个初始化的package.json文件
可以通过自定义脚本文件，并且将脚本文件指向init
```
npm config set init-module ~\.npm-init.js
```
### npm link 将模块链接到项目使用
example: https://www.jianshu.com/p/aaa7db89a5b2
### npx 的作用
执行模块内文件
