### 作用
移除JS上下文中未引用的代码（dead code）。

最先在rollup中提出，后蔓延到整个生态。

### Tree Shaking 依赖ESM规范
CommonJS 定义的模块化规范，只有在执行代码后，才能动态确定依赖模块，因此不具备 Tree Shaking 的先天条件。

### 对副作用模块进行Tree Shaking
有副作用的代码，如JS 引用类型属性读/写所带来的副作用：
```
export function add(a, b) {

	return a + b

}

export const memoizedAdd = window.memoize(add)

```

### Babel 和Tree Shaking

+ Babel 默认将JS编译成Common.js
+ jest 等工具在Common.js中生效
+ Tree Shaking 在ESM中生效

对此可采取，分场景采用不同Babel配置，如production编译环境：
```
production: {

   presets: [

    [

     '@babel/preset-env',

     {

      modules: false

     }

    ]

   ]

  },

}

```
如开发环境：
```
test: {
   presets: [
    [
     '@babel/preset-env',
     {
      modules: 'commonjs
     }
    ]
   ]
  },
}
```

### webpack 中的Tree Shaking
Webpack4.0 以上版本在 mode 为 production 时，会自动开启 Tree Shaking 能力。

webpack代码移除模块，它主要依赖uglify功能。Webpack 负责对模块进行分析和标记，而这些压缩插件负责根据标记结果，进行代码删除。配置如下：

```
const config = {

 mode: 'production',

 optimization: {

  usedExports: true,

  minimizer: [

   new TerserPlugin({...}) // 支持删除死代码的压缩器

  ]

 }

}

```

### CSS 和Tree Shaking
CSS 的 Tree Shaking 要在样式表中，找出没有被应用到选择器样式，进行删除。

PostCSS 插件对 CSS 对应的 AST 进行操作，达到 Tree Shaking 的目的。
