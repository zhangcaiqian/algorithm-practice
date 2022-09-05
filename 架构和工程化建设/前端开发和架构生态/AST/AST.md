### 定义
抽象语法树AST（Abstract Syntax Tree，AST）是语法树的抽象表示，它以树的形式表现语法结构，树上的每个节点都代表一个语法结构。

AST 测试平台：[测试](https://astexplorer.net/)

### acorn
JS用acorn解析抽象语法树， ESLint、Babel、Vue.js都依赖acorn。babel 也依赖acorn，babel compile的流程如下：

* 解析: 将代码(其实就是字符串)转换成 AST( 抽象语法树)
* 转换: 访问 AST 的节点进行变换操作生成新的 AST
* 生成: 以新的 AST 为基础生成代
解析流程如下图：
![测试](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/acorn.png)


acorn 将词法分析和语法分析交替进行，只需要扫描一遍代码即可得到最终 AST 结果。

------------------------------------
### 实现一个简单 acorn parser
关键步骤：
1. 词法分析，将代码分割成token流，即语法数组
2. 语法分析，将语法数组变成树状结构

1. 词法分析哪些需要处理
    1. 科学计数法和数组
    2. ()
    3. 标识符、变量、关键字、运算符
    4. 注释符，中括号


词法分析代码：
例：
```
const add = (a, b) => a + b
```

期望的结果
```
[
  { type: "identifier", value: "const" },
  { type: "whitespace", value: " " },
  ...
]
```
词法分析器实现代码：
```
// 词法分析器，接收字符返回token数组
export // 词法分析器，接收字符返回token数组
const tokenizer = (code) => {
    // 储存 token 数组
    const tokens = [];
    
    // 指针
    let current = 0;
    
    while (current < code.length) {
        // 获取指针指向的字符
        const char = code[current];
        
        // 先处理单字符的语法单元，类似于";" "("")"
        if (char === "(" || char === ")") {
            tokens.push({
                type: "parens",
                value: char,
            });
            current ++;
            continue;
        }
        
        // 处理标识符，标识符一般为以 字母、_、$ 开头
        if (/[a-zA-Z$_]/.test(char)) {
            let value = "";
            value += char;
            current ++;
            
            // 如果是连续字符则将其拼接在一起，随后指针后移
            while (/[a-zA-Z0-9$_]/.test(code[current]) && current < code.length) {
                value += code[current];
                current ++;
            }
            
            tokens.push({
                type: "identifier",
                value,
            });
            continue;
        }
        
        // 处理空白字符
        if (/\s/.test(char))
        {
            let value = "";
            value += char;
            current ++;
        
            while (/\s/.test(code[current]) && current < code.length) {
                value += code[current];
                current ++;
            }
            
            tokens.push({
                type: "whitespace",
                value,
            });
            continue;
        }
        
         // 处理逗号分隔符
        if (/,/.test(char)) {

            tokens.push({
                type: ',',
                value: ',',
            });

            current ++;
            continue;
        }
        
        // 处理运算符
        if (/[=|+|>]/.test(char)) {
            let value = '';
            value += char;
            current ++;

            while (/[=|+|>]/.test(code[current])) {
                value += code[current];
                current ++;
            }

            // 当 = 后面有 > 时为箭头函数而非运算符
            if (value === '=>') {
                tokens.push({
                    type: 'ArrowFunctionExpression',
                    value,
                });
                continue;
            }

            tokens.push({
                type: 'operator',
                value,
            });

            continue;
        }
        console.log("char:", char);
        // 如果碰到我们词法分析器以外的字符,则报错
        throw new TypeError('I dont know what this character is: ' + char);
    }
    return tokens;
}
let code = "const add = (a, b) => a + b";
console.log(tokenizer(code));
```