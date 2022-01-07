### 阿里菜鸟流程
上架流程

自制流程引擎 + 数据库配置

1. 流程引擎增加了额外的认知体验
2. 串联步清晰


### 结构化分解
> 问题的本质不在于流程编排，而是结构化分解
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/DDD结构化分解.jpeg)

设计模式：组合模式（Composed Method Pattern）
> 组合模式(Composite Pattern)：组合多个对象形成树形结构以表示具有 "整体—部分" 关系的层次结构。组合模式对单个对象（即叶子对象）和组合对象（即容器对象）的使用具有一致性，组合模式又可以称为 "整体—部分"(Part-Whole) 模式，它是一种对象结构型模式。
> 可以让叶子对象和容器对象的使用具有一致性。
> 在XML解析、组织结构树处理、文件系统设计

* 问题
1. 领域知识被割裂
2. 代码的业务代码语义表达能力弱

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/DDD结构化分解2.jpeg)

借助领域建模后

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/借助领域建模后.jpeg)≥


### 领域建模
第一部分：结构化分解
第二部分：领域层，领域建模c
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/DDD改造完1.jpeg)

### 应用架构治理：共享内核
将公用部分商品领域组件抽出「共享内核」，

来做领域之间通信的基本方式。统一商品信息模型、商品信息的存储和数据。

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/共享内核.jpeg)

其中商品领域：domain 和 infrastructure。

![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/domain.jpeg)

domain: 承载商品域模型，

通过 Infrastructure  来进行解耦，进行依赖倒置。

依赖解耦。

### Cola（Clean Object-oriented & Layer Architecture）
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/cola.jpeg)

业务依赖，地址做成业务组件

方法1. 防腐层  2. SDK

1. 怎样治理复杂度
2. 怎样让架构做得更好

* 分层设计
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/Cola分层设计.jpeg)

* 解耦设计
通过依赖倒置，让infrastructure 反向依赖 domain 
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/解耦.jpeg)

怎么实现呢？
Java 在 infrastructure 强制依赖 domain， domain里只提供interface，通过应用规范强制编码规范。
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/Java解耦.jpeg)

> ![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/简洁之道.jpeg)

* 组件分层
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/组件分层.jpeg)

* Cola架构
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/Cola架构.jpeg)

### 认知成本
* DDD：统一语言
> 语言是符号，共识即正确
kangaroo  的例子

* 一个团队，只有一种语言

业务概念-PRD文档-日常沟通-设计文档-代码

核心领域词汇表

* 语言在进化，也需要重构
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/语言进化.jpeg)

* 语言有上下文
边界上下文
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/领域划分.jpeg)

Context Mapping-领域映射

1. 共享内核
IMG_42BA510FE104-1.jpeg

共同模型做成组件，JAR包的形式引入到不同

2. 反腐
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/防腐.jpeg)