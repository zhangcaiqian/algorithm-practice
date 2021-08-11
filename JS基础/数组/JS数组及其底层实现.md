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
```

```