### 整体变化
### 变化点
+ 生命周期的变化
    + beforeCreate - setup()
    + created  -  setup()
+ 使用proxy代替defineProperty
    + defineProperty进行响应式或者双向绑定上，之前没有后加的属性是不会被绑定上，也就不会触发更新渲染
    + defineProperty只能响应首次渲染时候的属性，Proxy需要的是整体，不需要关心里面有什么属性
    + 且Proxy的配置项有13种，可以做更细致的事情，这是之前的defineProperty无法达到的

### Diff算法的提升
+ 在DOM树级别。我们注意到，在没有动态改变节点结构的模板指令（例如v-if和v-for）的情况下，节点结构保持完全静态。如果我们将一个模板分成由这些结构指令分隔的嵌套“块”，则每个块中的节点结构将再次完全静态。当我们更新块中的节点时，我们不再需要递归遍历DOM树 - 该块内的动态绑定可以在一个平面数组中跟踪。这种优化通过将需要执行的树遍历量减少一个数量级来规避虚拟DOM的大部分开销。

### 支持ts
+ vue3 借鉴了react hook实现了更自由的编程方式，提出了Composition API

### 打包提及的变化
+ 把全局API和内部帮助程序移动到JS的module.exports。使得打包时候能够静态分析，进行Tree Shaking。

### setup 使用
不受调用顺序的限制，可以有条件地被调用；
不会在后续更新时不断产生大量的内联函数而影响引擎优化或是导致 GC 压力；
不需要总是使用 useCallback 来缓存传给子组件的回调以防止过度更新；
不需要担心传了错误的依赖数组给 useEffect/useMemo/useCallback 从而导致回调中- 使用了过期的值 —— Vue 的依赖追踪是全自动的。

### 整体结构分析
```
//dom 里的东西基本上都是没有变的
<template>
  <h1>{{ msg }}</h1>
  <button @click="increment">
    count: {{ state.count }}, double: {{ state.double }},three：{{ three }},refnum：{{refnum}}
  </button>
</template>

<script>
//这里就是Vue3的组合Api了，这里跟react的 import { useState ,useEffect } from 'react' 有些类似，需要用啥引啥
import {ref, reactive, computed ,watchEffect,watch} from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  //上面对比的时候说过，setup相当于beforeCreate 和created，简单理解就是初始化
  setup() { 
  	//这里通过reactive使state成为相应状态（后面会详细介绍）
    const state = reactive({
      count: 0,
      //计算属性computed的使用更灵活了
      double: computed(() => state.count * 2),
    });
    //computed也可以单独拿出来使用
    const three = computed(() => state.count * 3)
    //ref跟reactive作用一样都是用来数据相应的，ref的颗粒度更小（后面详细对比）
	const refnum = ref()
   //这里的watchEffect只要里面的变量发生了改变就会执行,并且第一次渲染会立即执行,没有变化前后返回参数，无法监听整个reactive
    watchEffect(() => {
      refnum.value = state.count;
      console.log(state, "watchEffect");
    });
    //watch里第一个参数是监听需要的变量，第二个是执行的回调函数，
    watch(refnum,(a,b)=>{
      console.log(a,b,'watch,a,b')
    })
    //所有的方法里再也不需要用this了，这是很爽的
    function increment() {
      state.count++;
    }
   	//组中模板中需要的变量，都要通过return给暴露出去，就像当初data({return { } }) 是一样的
    return {
      state,
      increment,
      three,
      refnum
    };
  },
};
</script>

```
### 生命周期
生命周期语义化了，需要在组合API里面获取。

以下例子最终执行顺序还是和以前一样。
```
<script>
import {
  reactive,
  computed,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onUnmounted,
  onBeforeUnmount,
} from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });
    function increment() {
      state.count++;
    }
    onUpdated(() => {
      console.log("onUpdated");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate1");
    });
    onMounted(() => {
      console.log("onMounted");
    });
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    console.log("setup");
    return {
      state,
      increment,
    };
  },
};
</script>

```

### 组件API
#### setup中的父子组件
```
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Baby张  Vue3 RC" />
  //这里传参给子组件
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
import { provide } from "vue";
export default {
  name: "App",
  components: {
    HelloWorld,
  }
};
</script>

```
子组件
```
//props 接收的父组件传的参数，这就有点像react的props了
//ctx 这个参数表示的当前对象实例，也就个是变相的this
setup(props,ctx){
 console.log(props.msg, ctx, "app-setup");
}

```

#### ref、toRef、toRefs

### 文章链接
[vue2.0 和 3.0的区别](https://juejin.cn/post/6892295955844956167)