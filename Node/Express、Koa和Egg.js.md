### 洋葱模型
要从洋葱中心点穿过去，必须一层层向内穿入洋葱表皮进入中心点，然后再从中心点一层层向外穿出表皮。

穿入表皮多少层，穿出表皮多少层，先进先出。

洋葱表皮可以思考为「中间件」

+ 从外向内的过程是一个关键词 next()
+ 而从内向外则是每个中间件执行完毕后，进入下一层中间件，到最后一层，

### Express 和 Koa
+ Express 封装、内置了中间件，比如router和router，而KOA 比较轻量
+ Express没有严格按照洋葱模型执行，KOA则严格执行
+ Express基于回调处理中间件的，而KOA是基于aync/await

### Express
+ app: express 函数的返回，并且将 application 的函数继承给 app
+ app.use 用于中间件及路由的处理