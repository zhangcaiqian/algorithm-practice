const deepClone = (obj) => {
    const toString = Object.prototype.toString;

    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    if (obj.nodeType && 'cloneNode' in obj) {
        return obj.cloneNode(true);
    }

    if (toString.call(obj) === '[object Date]') {
        return new Date(obj.getTime());
    }

    if (toString.call(obj) === '[object RegExp]') {
        const flags = [];
        if (obj.global) {
            flags.push('g');
        }
        if (obj.multiline) {
            flags.push('m');
        }
        if (obj.ignoreCase) {
            flags.push('i');
        }

        return new RegExp(obj.source, flags.join(''));
    }

    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

    for (let key in obj) {
        result[key] = deepClone(obj[key]);
    }

    return result;
}

const a = {
    name: 'qiu',
    birth: new Date(),
    pattern: /qiu/gim,
    container: document.body,
    hobbys: ['book', new Date(), /aaa/gim, 111],
    f: function () { return 123 }
};

const b = deepClone(a);
console.log(b.f());
