### 深浅拷贝的区别
+ 浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝。
+ 深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。

### 浅拷贝的常用方法

+ Object.assign(target, ...source);
+ 扩展运算符
 ```
    /* 对象的拷贝 */
    let obj = {a:1,b:{c:1}}
    let obj2 = {...obj}
    obj.a = 2
    console.log(obj)  //{a:2,b:{c:1}} 
    console.log(obj2); //{a:1,b:{c:1}}
```
+ 数组 slice
```
let arr = [1, 2, {val: 4}];
let newArr = arr.slice();
newArr[2].val = 1000;
console.log(arr);  //[ 1, 2, { val: 1000 } ]
```

### 手工实现一个浅拷贝
需要实现：

+ 对基础类型做一个最基本的一个拷贝
+ 对引用类型开辟一个新的存储，并且拷贝一层对象属性。

```
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

### 深拷贝方法
JSON.parse(JSON.stringify(obj))方法实现一个深拷贝。
```
let obj1 = { a:1, b:[1,2,3] }
let str = JSON.stringify(obj1)；
let obj2 = JSON.parse(str)；
console.log(obj2);   //{a:1,b:[1,2,3]} 
```
存在的问题
+ 拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
+ 拷贝 Date 引用类型会变成字符串
+ 无法拷贝不可枚举的属性
+ 无法拷贝对象的原型链；
+ 拷贝 RegExp 引用类型会变成空对象；
+ 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
+ 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。

### 手动实现深拷贝
```
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {
    if (obj.constructor === Date) 
        return new Date(obj)       // 日期对象直接返回一个新的日期对象
    if (obj.constructor === RegExp)
        return new RegExp(obj)     //正则对象直接返回一个新的正则对象
    //如果循环引用了就用 weakMap 来解决
    if (hash.has(obj)) return hash.get(obj)
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    //遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    //继承原型链
    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) { 
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
    }
    return cloneObj
}

```