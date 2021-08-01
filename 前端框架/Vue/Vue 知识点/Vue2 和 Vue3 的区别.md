### 整体变化
### 变化点
+ 使用proxy代替defineProperty
    + defineProperty进行响应式或者双向绑定上，之前没有后加的属性是不会被绑定上，也就不会触发更新渲染

defineProperty: 
```
Object.defineProperty( Obj, 'name', {
    enumerable: true, //可枚举
    configurable: true, //可配置
    // writable:true, //跟可配置不能同时存在
    // value:'name',  //可写死直
    get: function () {
        return def
    },
    set: function ( val ) {
        def = val
    }
} )

```
//两个参数，对象，13个配置项
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    },
    set:function(){ },
    ...13个配置项
};
const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;
console.log(p.a, p.b);      // 1, undefined
console.log('c' in p, p.c); // false, 37
```

defineProperty只能响应首次渲染时候的属性，Proxy需要的是整体，不需要关心里面有什么属性，而且Proxy的配置项有13种，可以做更细致的事情，这是之前的defineProperty无法达到的

### Diff算法的提升
+ 在DOM树级别。我们注意到，在没有动态改变节点结构的模板指令（例如v-if和v-for）的情况下，节点结构保持完全静态。如果我们将一个模板分成由这些结构指令分隔的嵌套“块”，则每个块中的节点结构将再次完全静态。当我们更新块中的节点时，我们不再需要递归遍历DOM树 - 该块内的动态绑定可以在一个平面数组中跟踪。这种优化通过将需要执行的树遍历量减少一个数量级来规避虚拟DOM的大部分开销。

### 支持ts
+ vue3 借鉴了react hook实现了更自由的编程方式，提出了Composition API

### setup 使用
不受调用顺序的限制，可以有条件地被调用；
不会在后续更新时不断产生大量的内联函数而影响引擎优化或是导致 GC 压力；
不需要总是使用 useCallback 来缓存传给子组件的回调以防止过度更新；
不需要担心传了错误的依赖数组给 useEffect/useMemo/useCallback 从而导致回调中- 使用了过期的值 —— Vue 的依赖追踪是全自动的。