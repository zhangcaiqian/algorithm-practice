### 盒模型
CSS基础，html是一个小方块，方块内有其他的方块，如同盒子一层层包裹起来，这就是所谓的盒模型。

盒模型分为IE盒模型和W3C标准盒模型。

W3C标准盒模型：
> 属性width、height 只包含内容 content，不包含boder和padding， box-sizing: content-box
IE盒模型：
> 属性width、height 包含border 和padding，指的是content + padding + border,  box-sizing: border-box

选择哪个盒模型是由box-sizing 控制的。
页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型，我们尽量使用W3C盒模型。

### 常见定位方案
+ 普通流 (normal flow)
    + 在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。
+ 浮动 (float)
    + 在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。
+ 绝对定位 (absolute positioning)
    + 在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。
+ 绝对定位和相对定位 
    + 绝对定位 position: absolute
        + 绝对定位脱离文档流
        + 如果其他具有不同z-index 的属性已经占据了该位置，他们互不影响，在同一位置层叠
        + 如果父级元素没有设定position，那么以浏览器左上角为原始点进行定位
        + 如果父级元素设置position，那么以父级元素的左上角为远点进行定位
    + 相对定位 position: relative
        + 相对定位是相对其初始位置进行偏移定位的
        + 参照父级（最近）的内容区的左上角为原始点结合TRBL属性进行定位
        + 不脱离文档流
        + 相对定位是不能层叠的。在使用相对定位时，无论元素是否进行移动，元素依然占据原来的空间




### BFC的概念
Block Formatting Contexts (块级格式化上下文)，它属于普通流。

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
+ body 根元素
+ 浮动元素：float 除 none 以外的值
+ 绝对定位元素：position (absolute、fixed)
+ display 为 inline-block、table-cells、flex
+ overflow 除了 visible 以外的值 (hidden、auto、scroll)

BFC 可用于
+ 解决外边距折叠问题
+ 清除浮动
+ 阻止浮动元素覆盖


### 样式覆盖优先级问题
在CSS中，当多个样式作用在同一个节点上时，不同选择器具有不同的权重，权重决定哪一个样式生效。
权重优先级：
1.  内联样式表的权值最高 1000；

2.  ID 选择器的权值为 100

3.  Class 类选择器的权值为 10

4.  HTML 标签选择器的权值为 1

5.  继承样式的权值为0.1(某些论文提出，但毫无疑问它的权值是最低的)

同时!important 会覆盖任何权重

### flex 弹性布局
+ display: flex将容器变为flex
+ Flex-direction属性可以改变主轴方向
+ Justify Content
+ align-items
+ align-self: 在align-items 的基础上调整交叉轴上子组件的布局

### css modules 
CSS Modules 是一个流行的，用于模块化和组合 CSS 的系统。vue-loader 提供了与 CSS Modules 的一流集成
+ 首先，CSS Modules 必须通过向 css-loader 传入 modules: true
```
loader: 'css-loader',
options: {
    // 开启 CSS Modules
    modules: true,
    // 自定义生成的类名
    localIdentName: '[local]_[hash:base64:8]'
}
```
然后在需要用module的地方
```
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
```
```
<template>
  <p :class="$style.red">
    This should be red
  </p>
</template>
```
### sass、less 
Sass和Less都属于CSS预处理器
+ 嵌套
+ 复用

### 移动端像素单位 px、百分比、vw、vh、rem 等
+ 一些需要了解的概念
    + css像素：我们在js或者css代码中使用的px单位就是指的是css像素
    + 物理像素：物理像素也称设备像素，只与设备或者说硬件有关，同样尺寸的屏幕，设备的密度越高，物理像素也就越多。
    + 布局视口：pc网页在移动端的默认布局
    + 视觉视口：视觉视口表示浏览器内看到的网站的显示区域
    + 理想视口：设备的分辨率
    + 1DPR = 物理像素／分辨率

我们可以通过viewport将视口设置成理想视口
PC端的布局视口 980px，移动端以iphone6为例，分辨率为375 * 667，也就是说布局视口在理想的情况下为375px。比如现在我们有一个750px * 1134px的视觉稿，那么在pc端，一个css像素可以如下计算：
> PC: 1CSS 像素 =  物理像素／分辨率 = 750 ／ 980 =0.76 px
> iphone 6 : ：1 CSS像素 = 物理像素 ／分辨率 = 750 ／ 375 = 2 px
#### 媒体查询实现自适应
给每一种设备各一套不同的样式来实现自适应。

@media媒体查询可以针对不同的媒体类型定义不同的样式，特别是响应式页面，可以针对不同屏幕的大小，编写多套样式，从而达到自适应的效果。

```
@media screen and (max-width: 960px){
    body{
      background-color:#FF6699
    }
}

@media screen and (max-width: 768px){
    body{
      background-color:#00FF66;
    }
}
```
#### 通过百分比设置自适应
比如当浏览器的宽度或者高度发生变化时，通过百分比单位，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。

各个属性中如果使用百分比，相对父元素的属性并不是唯一的。
+ width和height相对于父元素的width和height
+ margin、padding不管垂直还是水平方向都相对比父元素的宽度
+ border-radius则是相对于元素自身等等
造成我们使用百分比单位容易使布局问题变得复杂。

#### rem解决方案
rem是一个灵活的、可扩展的单位。

rem无论嵌套层级如何，都只相当于浏览器的根元素font-size。默认情况下，html元素的font-size为12px

我们可以通过rem来动态改变font-size从而实现自适应。

```
function refreshRem() {
    var docEl = doc.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
win.addEventListener('resize', refreshRem);
```
同时，px2rem-loader 可以将px变成rem

#### vw/vh来实现自适应
+ 相对于视窗的宽度，视窗宽度是100vw
+ 相对于视窗的高度，视窗高度是100vh
+ 和 % 的区别，大部分相对于祖先元素，也有相对于自身的情况比如（border-radius、translate等)。
> 对于iphone6/7 375*667, 1px = 1 / 375 * 100 vw

### 逻辑像素、物理像素、设备像素比 是什么
#### 物理像素
设备屏幕实际拥有的像素点，屏幕的基本单元，是有实体的。比如iPhone 6的屏幕在宽度方向有750个像素点，高度方向有1334个像素点，所有iPhone 6 总共有750*1334个像素点。


屏幕普遍采用RGB色域(红、绿、蓝三个子像素构成),而印刷行业普遍使用CMYK色域(青、品红、黄和黑)。
![image](https://github.com/zhangcaiqian/algorithm-practice/blob/master/Assets/物理像素.png)
#### 逻辑像素
“设备独立像素”（Device Independent Pixel，DIP），可以理解为反映在CSS/JS程序里面的像素点

我们在js或者css代码中使用的px单位就是指的是css像素。

#### 设备像素比
设备像素比（Device Pixel Ratio，DPR）。物理像素/逻辑像素

### 什么情况下会reflow repaint
+ 需要重新验证渲染树（或整个树）的部分，并重新计算节点尺寸，这称为reflow，或者layout,或者layouting，注意：一个初始页面至少有一次reflow
    + 调整窗口大小
    + 样式表变动
    + dom操作
    + css伪类激活
    + 计算元素的offsetWidth、offsetHeight、clientWidth、clientHeight、width、height、scrollTop、scrollHeight

+ 由于节点几何属性的变化或者因为样式变化（例如更改背景颜色），需要更新屏幕的某些部分，这时屏幕的更新这称为repaint或redraw
    + 更改元素的可见性（visibility，opacity应该也算 ）
    + 更改元素的边框
    + 更改元素的背景


### 什么时候用CSS动画，什么时候用transition
+ CSS的transition只有两个状态：开始状态 和 结束状态；但animation可能是多个状态，
+ 有帧的概念CSS的transition需要借助别的方式来触发，比如CSS的状态选择器（如:hover）或 借助JavaScript来触发；animation可以自动触发
+  animation 控制动效上要比 transition 强，因为它具备一些控制动效的属性，比如“播放次数”、“播放方向”、“播放状态”等

相同点： “持续时间”、“延迟时间” 和“时间缓动函数”等概念，这些都是用来控制动效的效果。

### 如何判断动画结束时间
```
var x = document.getElementById("myDIV");
// Chrome, Safari 和 Opera 代码
x.addEventListener("webkitAnimationEnd", myStartFunction);
x.addEventListener("animationend", myStartFunction);
document.getElementById("myDIV").addEventListener("webkitTransitionEnd", myFunction);
// 标准语法
document.getElementById("myDIV").addEventListener("transitionend", myFunction);
```