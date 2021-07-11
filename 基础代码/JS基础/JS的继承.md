> 1.JS 的继承到底有多少种实现方式呢？
> 2.ES6 的 extends 关键字是用哪种继承方式实现的呢？

### 对象、原型链和构造函数
* 实例是由构造函数实例化创建的，在每一个实例对象中的__proto__中同时有一个 constructor 属性，该属性指向创建该实例的构造函数。
* JS语言面向对象的继承的是实现方式是原型链，每个函数在被创建的时候，都会默认有一个prototype对象，该对象就是函数的原型，原型对象的原型对象一直往上寻找是object的原型对象。
* ![示意图](https://www.oecom.cn/the-relationship-between-the-prototype-proto-constructor/)
### 组合继承
* 改变prototype，同时调用call获取父类的属性
```
function Parent3 ()
{
    this.name = "Parent3";
    this.play = [1, 2, 3];
}
Parent3.prototype.getName = function ()
{
    console.log("getName:", this.name);
    return this.name;
}
function Child3 ()
{
    Parent3.call(this);
    this.type = "Child3";
}
Child3.prototype = Object.create(Parent3.prototype);
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'
```
### 寄生式继承
* 使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法。
* 原型式继承（Object.create()这个方法接收参数用作新对象原型的对象）
```
let parent5 = {
    name: "parent5",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
};

function clone(original) {
    let clone = Object.create(original);
    clone.getFriends = function() {
        return this.friends;
    };
    return clone;
}

let person5 = clone(parent5);

console.log(person5.getName());
console.log(person5.getFriends());
```
### extends
* ES6语法糖
```
class Person {
  constructor(name) {
    this.name = name
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log('Person:', this.name)
  }
}
class Gamer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    super(name)
    this.age = age
  }
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法
```