> 用什么样的思路可以 new 关键词？apply、call、bind 这三个方法之间有什么区别?怎样实现一个 apply 或者 call 的方法？
### new原理
#### 执行实例函数，返回一个实例对象
```
let name = "Jack";
function Person ()
{
    console.log("this.name:", this.name); // undefined
    console.log("name:", name); // Jack
    this.name = "Rose";
}
let p1 = new Person();

console.log("name:", name); // Jack
console.log("p.name:", p1.name); // Rose
```
步骤：
* 创建一个新对象
* this指向新对象
* 执行构造函数中的代码（为这个新对象添加属性）
* 返回新对象

#### 执行实例函数，要么返回实例，要么返回return后的指定对象
```
function Person(){
   this.name = 'Jack';
   return {age: 18};
}
var p = new Person(); 
console.log(p); // { age: 18 }
console.log(p.name); // undefined
console.log(p.age); // 18
```
```
function Person(){
   this.name = 'Jack'; 
   return 'tom';
}
var p = new Person(); 
console.log(p); // { name: 'Jack' }
console.log(p.name); // Jack

```
### apply & call & bind 原理
用法：
```
func.call(thisArg, param1, param2, ...)
func.apply(thisArg, [param1,param2,...])
func.bind(thisArg, param1, param2, ...)
```
### ArrayLike 实现数组
```
var arrayLike = { 
    0: 'java',
    1: 'script',
    length: 2
} 
Array.prototype.push.call(arrayLike, 'jack', 'lily'); 
console.log(typeof arrayLike); // 'object'
console.log(arrayLike);
```
### 手写 new
注：Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__，它的参数是要创建对象的prototype。
1. 让实例可以访问到私有属性；
2. 让实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性；
3. 构造函数返回的最后结果是引用数据类型。
```
function _new(ctor, ...args) {
    if (typeof ctor !== "function")
    {
        throw 'ctor must be a function';
    }
    let obj = new Object();
    // 实例绑定原型
    obj._proto = Object.create(ctor.prototype);
    // 执行构造函数
    let res = ctor.call(obj, ...args);
    let isObj = typeof res === "object" && typeof res !== "null";
    let isFunc = typeof res === "function";
    // new返回构造函数执行结果或者实例本身
    return isObj || isFunc ? res : obj;
}
```
### 手写apply和call

```
Function.prototype.call = function (context, ...args) {
    var context = context || window;
    context.fn = this;
    var result = eval('context.fn(...args)');
    delete context.fn
    return result;
}
Function.prototype.apply = function (context, args) {
    let context = context || window;
    context.fn = this;
    let result = eval('context.fn(...args)');
    delete context.fn
    return result;
}
```
### 手写bind
```
Function.prototype.bind = function (context, ...args) {
    if (typeof this !== "function") {
      throw new Error("this must be a function");
    }
    var self = this;
    // 当这个绑定函数被当做普通函数调用的时候，可以直接用context； 而返回的这个之后当做构造函数使用的时候，却是指向这个实例，所以this instanceof self为true时，要用this
    var fbound = function () {
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }
    if(this.prototype) {
      fbound.prototype = Object.create(this.prototype);
    }
    return fbound;
}
```