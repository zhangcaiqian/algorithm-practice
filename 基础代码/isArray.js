const isArray = (obj) => {
    if (typeof obj === 'object') {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    return false;
}
const a = []
console.log(isArray(a));