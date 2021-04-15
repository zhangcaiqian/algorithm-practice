Function.prototype.apply = function(ctx) {
    if (typeof this !== 'function') {
        throw new Error('not a function');
    }
    let args = arguments[1];
    let result = null;
    ctx = ctx || widnow;
    ctx.fn = this;
    if (args) {
        result = ctx.fn(...args);
    } else {
        result = ctx.fn();
    }
    delete ctx.fn;
    return result;
};