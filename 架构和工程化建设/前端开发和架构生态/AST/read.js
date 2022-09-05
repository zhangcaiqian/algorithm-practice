#!/usr/bin/env node

// recast.run —— 命令行文件读取
// node read可以读取demo.js文件，并将demo.js内容转化为ast对象。
// 同时它还提供了一个printSource函数，随时可以将ast的内容转换回源码，以方便调试。

const recast  = require('recast')
// TNT，即recast.types.namedTypes，就像它的名字一样火爆，它用来判断AST对象是否为指定的类型。
// TNT.Node.assert()，就像在机器里埋好的炸药，当机器不能完好运转时（类型不匹配），就炸毁机器(报错退出)
// TNT.Node.check()，则可以判断类型是否一致，并输出False和True
const TNT = recast.types.namedTypes

recast.run(function(ast, printSource) {
    recast.visit(ast, {
        // recast.visit将AST对象内的节点进行逐个遍历。
        // 你想操作函数声明，就使用visitFunctionDelaration遍历，想操作赋值表达式，就使用visitExpressionStatement。 只要在 AST对象文档中定义的对象，在前面加visit，即可遍历。
        // 通过node可以取到AST对象
        // 每个遍历函数后必须加上return false，或者选择以下写法，否则报错：
        visitExpressionStatement: function(path) {
            // 调试时，如果你想输出AST对象，可以console.log(node)
            // 如果你想输出AST对象对应的源码，可以printSource(node)
            // console.log(node)
            // return false
            const node = path.value
            // 判断是否为ExpressionStatement，正确则输出一行字。
            if(TNT.ExpressionStatement.check(node)){
                console.log('这是一个ExpressionStatement')
            }
            this.traverse(path);
        }
    });
});