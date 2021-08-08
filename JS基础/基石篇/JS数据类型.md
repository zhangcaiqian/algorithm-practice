### 数据类型
#### 基础类型
+ Undefined、Null、Number、Boolean、String，Symbol、BigInt 6种基本数据类型
+ 基础类型存储在栈内存，引用/拷贝时创建相等的变量
#### 引用类型
+ Object
    + Array、Date、Math、Function、RegExp 引用类型存储在堆内存中，引用时会传递地址，可能多个变量指向同一个

eg.
```
let a = {
    name: "Julie",
    age: 20
}
function change (o)
{
    o.age = 24;
    o = {
        name: "Kath",
        age: 30
    };
    return o;
}

let b = change(a);
console.log("a.name:", a.name);
console.log("a.age:", a.age);
console.log("b.name", b.name);
console.log("b.age:", b.age);
```
### 检测方法
+ typeof
```
typeof(1) // number
typeof('1') // string
typeof(undefined) // undefined
typeof(console.log) // function
//------ 引用类型 --------
typeof([]) // object
typeof({}) // object
typeof(null) // object bug

```

可判断基础数据类型、不可判断引用
+ instanceof
```
"a" instanceof String true

```
可判断引用、不可判断基础数据类型
+ 最终办法 Object.prototype.toString.call(o).slice(8, -1)
### 类型转化
+ 显式
    + Number
        + Bool // 0, 1; undefined // NaN; null // 0; 字符串 只有数字转为数字，浮点类型转为浮点类型，空转为0，否则转NaN; 对象ValueOf 再依前面规则转换
    + ParseInt
    + toString
    + Bool
        + 除undefined、null、 false、0、NaN 为false，其余为1

+ 隐式
    + 逻辑
        + 如果其中一个操作值是 null 或者 undefined，那么另一个操作符必须为 null 或者 undefined，才会返回 true，否则都返回 false；
        + 两个操作值如果为 string 和 number 类型，那么就会将字符串转换为 number
        + 如果一个操作值是 boolean，那么转换成 number
```
    null == undefined // true
    null == 0 // false
    '' == null // false
    '' == 0 // true
    0 == false // true
```
    + 运算
        + '+'如果其中一个是字符串，另一个是undefined、null、bool，调用toString拼接，如果其中一个是对象，调用对象的valueOf
        + 如果其中一个是number，另一个是undefined、null、bool调用转数字
        + 字符串和数字 转换为字符串
```
'1' + undefined // '1undefined'
'1' + null      // '1null'
'1' + true      // '1true'
1 + undefined   // NAN
1 + null        // 1
1 + true        // 2
```
    + 关系操作
        + 类型相同 无需转换
        + null == undefined
        + string 和 number转 number
        + 一个是bool，转成number
    + if/while

### 深拷贝和浅拷贝
> 1. 拷贝一个多层嵌套的对象怎么实现 2.什么样的深拷贝代码才是合格的
+ 浅拷贝
    创建一个新的对象来接受复制或引用的对象值，基础对象复制值给新对象，引用数据类型复制地址
    + Object.assin(target, ...source) // 不会拷贝继承和不可枚举属性
    + 扩展运算符 [...obj]
    + 数组 arr.concat(), arr.slice()
+ 手动实现浅拷贝
    + 基础类型拷贝
    + 引用类型开辟新存储，并拷贝一层对象属性
    ```
    const shallowClone = (target) => {
        if (typeof target == "object" && typeof target != "null")
        {
            const cloneTarget = Array.isArray(target) ? [] : {};
            for (let prop in target)
            {
                if (target.hasOwnProperty(prop))
                    cloneTarget[prop] = target[prop];
            }
            return cloneTarget;
        }
        else
        {
            return target;
        }
    }
    console.log(shallowClone([1, 3,4]));
    let a = {"a": 1,"b": {"c": 2}}
    let b = shallowClone(a);
    b.a = 11;
    b.b.c = 22;
    console.log(b);
    ```
+ 深拷贝
    + 将对象在堆中拷贝出来一份给目标对象，并在堆中开辟一个新的内存放新对象，并且新对象的修改不会改变原对象
    + 乞丐版：JSON.parse(JSON.stringify(o))
        + 函数键值对消失
        + Date 变成String
        + 不可拷贝不可枚举
        + 无法拷贝原型链
        + RegExp 变为空
        + NaN、Infinity变成null
        + 无法拷贝对象的循环引用 obj[a] = obj
    + 基础版：
        + 不可解决循环引用
        + 不可解决Array
        + 不可拷贝不可枚举
    ```
    function deepClone (obj)
    {
        let cloneObj = {};
        for (let key in obj)
        {
            if (typeof obj[key] == "object")
            {
                cloneObj[key] = deepClone(obj[key]);
            }
            else
            {
                cloneObj[key] = obj[key];
            }
        }
        return cloneObj;
    }
    ```
    + 改进版：
        + 针对普通Object，用Reflect.OwnKey
        + Date, RegExp 直接生成新实例
        + Object.GetOwnDescriptors获取对象属性描述，并用Object.create创建对象的原型链
        + 利用weakMap类型作为哈希表，如果存在循环，直接返回weakMap的值
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
    // 下面是验证代码
    let obj = {
        num: 0,
        str: '',
        boolean: true,
        unf: undefined,
        nul: null,
        obj: { name: '我是一个对象', id: 1 },
        arr: [0, 1, 2],
        func: function () { console.log('我是一个函数') },
        date: new Date(0),
        reg: new RegExp('/我是一个正则/ig'),
        [Symbol('1')]: 1,
        };
        Object.defineProperty(obj, 'innumerable', {
        enumerable: false, value: '不可枚举属性' }
    );
    obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
    obj.loop = obj    // 设置loop成循环引用的属性
    let cloneObj = deepClone(obj)
    cloneObj.arr.push(4)
    console.log('obj', obj)
    console.log('cloneObj', cloneObj)
    ```





