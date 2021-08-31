+ hash模式是通过改变锚点(#)来更新页面URL，并不会触发页面重新加载，我们可以通过window.onhashchange监听到hash的改变，从而处理路由。
+ history模式是通过调用window.history对象上的一系列方法来实现页面的无刷新跳转。