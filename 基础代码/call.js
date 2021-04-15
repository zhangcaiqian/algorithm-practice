Function.prototype.myCall = function(ctx) {
    // 判断调用对象是否为函数
    if(typeof this !== 'function') {
        throw new Error('not a function');
    }
    // 获取参数
    let args = [...arguments].slice(1);
    let result = null;
    // 判断是否传入上下文对象，如果没有，则默认为 window
    ctx = ctx || window;
    ctx.fn = this;
    result = ctx.fn(...args);
    delete ctx.fn;
    return result;
}

function a(){
    console.log(this);
};

a.myCall({a:1}, 1,2,3);