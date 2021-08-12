### 什么是服务器端渲染 (SSR)？
Vue.js 将组件渲染为服务器端的HTML字符串，将它们直接发送到浏览器，最后将这些静态标记“激活”为客户端上可交互的应用程序。

优点：
+ 更好的SEO
+ 更快的内容到达

缺点：
+ 特定生命周期钩子函数
+ 部署Node.js server运行环境
+ 服务端资源负载

### 实现一个服务端渲染，不包含Ajax初始化数据
> 服务端渲染SSR，类似于同构，最终要让一份代码既可以在服务端运行，也可以在客户端运行。如果SSR过程中出现问题，还可以回滚到纯浏览器渲染，保证用户正常看到页面。

思路：

有两个 webpack 的入口文件，一个用于浏览器侧渲染 webpack.client.config.js， 一个用于服务端渲染 webpack.server.config.js，公有部分抽出来作为webpack.base.config.js, 后续通过 webpack.merge进行合并，同时也需要一个 server 来提供 http 服务。

1. app.js
```
import Vue from 'vue';
import App from './App.vue';

// 每个用户都会生成新的应用程序实例

export function createApp() {
    const app = new Vue({
        render: h => h(App)
    });

    return { app }
}
```
2. 在浏览器端，新建根组件，然后挂载
```
import { createApp } from './app.js';
const { app } = createApp();
app.$mount('#app');
```
3. index.ssr.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>服务端渲染</title>
</head>
<body>
  <!--vue-ssr-outlet-->
  <script type="text/javascript" src="<%= htmlWebpackPlugin.options.files.js %>"></script>
</body>
</html>
```
+ <!--vue-ssr-outlet--> 的作用是作为一个占位符，后续通过 vue-server-renderer 插件，将服务器解析出的组件html字符串插入到这里。
+ <script type="text/javascript" src="<%=htmlWebpackPlugin.options.files.js%>"> 将webpack.client.config.js 打包出的文件放到这里
+ 后续还需要进行「客户端激活」，Vue接管服务端发送的静态HTML，使其变为Vue管理的动态Dom。

在entry-client.js中，用下面这行挂载mount应用程序。

```
app.$mount('#app')
```

4. webpack 的配置

webpack.base.config.js :

```
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',

  resolve: {
    extensions: ['.js', '.vue']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000    // 10Kb
          }
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
};
```

webpack.client.config.js: 
```
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    entry: {
        client: path.resolve(__dirname, '../src/entry-client.js')
    },
    // 用 HtmlWebpackPlugin 将打出的包插入到index.html中
    plugins: [
        
        new HtmlWebpackPlugin({
           
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html'
        })
    ]
});
```

webpack.server.config.js:
```
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');

// 打包服务器端依赖的代码，所以target要设为node，同时，output的libraryTarget要设为commonjs2
module.exports = merge(base, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '../src/entry-server.js')
    },
    output: {
        libraryTarget: 'commonjs2'
    },

    // 用 HtmlWebpackPlugin 将「client」的包注入模版，用于Vue激活模版
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.ssr.html'),
            filename: 'index.ssr.html',

            files: {
                js: 'client.bundle.js'
            },
            excludeChunks: ['server']
        })
    ]
});

```
// server.bundle.js 被vue-server-renderer使用，输出一个根组件app

5. 起一个server服务
```
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();

const bundle = fs.readFileSync(path.resolve(__dirname, '../dist/server.js'), 'utf-8');
const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')
});

// 后端Server
backendRouter.get('/index', (ctx, next) => {
    // 这里用 renderToString 的 promise 返回的 html 有问题，没有样式
    renderer.renderToString((err, html) => {
        if (err) {
            console.error(err);
            ctx.status = 500;
            ctx.body = '服务器内部错误';
        } else {
            console.log(html);
            ctx.status = 200;
            ctx.body = html;
        }
    });
});

backendApp.use(serve(path.resolve(__dirname, '../dist')));

backendApp
    .use(backendRouter.routes())
    .use(backendRouter.allowedMethods());

backendApp.listen(3000, () => {
    console.log('服务器端渲染地址： http://localhost:3000');
});


// 前端Server
frontendRouter.get('/index', (ctx, next) => {
    let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = html;
});

frontendApp.use(serve(path.resolve(__dirname, '../dist')));

frontendApp
    .use(frontendRouter.routes())
    .use(frontendRouter.allowedMethods());

frontendApp.listen(3001, () => {
    console.log('浏览器端渲染地址： http://localhost:3001');
});
```


### 有Ajax数据时
几个问题：
1. 服务端拿异步数据的步骤在哪里做
2. 如何确定哪些组件需要异步数据
3. 如何在拿到异步数据后塞到模版内

这几个问题，在纯浏览器渲染组件中，在create或者mount中请求数据，成功后修改data,Vue监听到data发生变化，走Dom Diff，打patch，Dom更新

SSR获取数据思路：

1. 在渲染前，要预先获取所有需要的异步数据，然后存到Vuex的store中。
2. 在后端渲染时，通过Vuex将获取到的数据注入到相应组件中。
3. 把store中的数据设置到window.__INITIAL_STATE__属性中。
4. 在浏览器环境中，通过Vuex将window.__INITIAL_STATE__里面的数据注入到相应组件中。

### SSR 参考文章
[参考文章](https://segmentfault.com/a/1190000016637877)
[代码仓库](https://github.com/xiguatailangmaixigua/vue-ssr)