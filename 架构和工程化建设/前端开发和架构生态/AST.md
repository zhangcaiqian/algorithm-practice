### 定义
抽象语法树AST（Abstract Syntax Tree，AST）是语法树的抽象表示，它以树的形式表现语法结构，树上的每个节点都代表一个语法结构。

AST 测试平台：[测试](https://astexplorer.net/)

### acorn
JS用acorn解析抽象语法树， ESLint、Babel、Vue.js都依赖acorn。
解析流程如下图：
![测试](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/acorn.png)

acorn 将词法分析和语法分析交替进行，只需要扫描一遍代码即可得到最终 AST 结果。
