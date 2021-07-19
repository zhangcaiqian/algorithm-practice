开篇问题列表：
* 我们的应用依赖了公共库 A 和公共库 B，同时公共库 A 也依赖了公共库 B，那么公共库 B 会被多次安装或重复打包吗？

### npm 安装机制和内部思想
优先安装依赖包到当前项目目录，使得不同应用项目的依赖各成体系，减轻兼容压力。

如果我们的项目 A 和项目 B，都依赖了相同的公共库 C，那么公共库 C 一般都会在项目 A 和项目 B 中，各被安装一次。这就说明，同一个依赖包可能在我们的电脑上进行多次安装。

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/%E9%A1%B9%E7%9B%AE%E8%B5%84%E6%BA%90/npm安装依赖.png)

** 注意：npm 在package.json 和 package-lock.json版本不一致时的处理和版本有关系，因此同一项目团队npm版本最好一致