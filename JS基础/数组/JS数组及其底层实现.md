### map的实现
```
Array.prototype.map = function(callbackFn, thisArg) {
    let _this = Object(this)
    let _bindThis = thisArg
    let length = _this.length
    let result = []
    for (let i = 0; i < length; i++) {
        let mapRes = callbackFn.call(_bindThis, _this[i])
        result[i] = mapRes
    }
    return result
}
```

### reduce 的实现
语法
> array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
> total: 累加值, currentValue: 当前元素, currentIndex:当前元素的索引
> initialValue: 初始值
```
    Array.prototype.reduce  = function () {
        let [callbackfn, initialValue] = [...arguments]
        if (this == null || this == undefined) throw new TypeError('Cannot read property reduce of null')
        if (Object.prototype.toString.call(callbackfn).slice(8, -1) !== 'Function') {
            throw new TypeError('is not a function')
        }
        let _this = Object(this)
        let len = _this.length >>> 0
        let accumulator = initialValue
        let k = 0 
        if (accumulator === undefined) {
            for (; k < len; k++) {
                console.log(accumulator)
                accumulator = _this[k]
                break
            }
        }
        console.log(accumulator)
        for (; k < len; k++) {
            accumulator = callbackfn.call(undefined, accumulator, _this[k], _this)
        }
        return accumulator
    }
    let a = [1,2,3,4]
    let res = a.reduce((accumulator, currentValue) => accumulator + currentValue, 10)
    console.log(res)
```