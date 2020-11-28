Function.prototype.myBind = function(ctx) {
    if (typeof this !== 'function') {
        throw new Error('not a function');
    }

    let args = [...arguments].slice(1);
    let fn = this;

    return function Fn() {
        return fn.apply(this instanceof Fn ? this : ctx, args.concat(...arguments));
    };
};

function a() {
    console.log(this);
};

let b = a.myBind({}, 1,2,3,4);
b();