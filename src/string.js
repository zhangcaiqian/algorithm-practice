function optimizeString(str) {
    if (!str || str.length <= 0) {
        return '';
    }
    let hashMap = {};
    let strArr = [...str];
    for(let i = 0; i < strArr.length; i++) {
        if (!hashMap[strArr[i]]) {
            hashMap[strArr[i]] = 1;
        } else {
            hashMap[strArr[i]] += 1
        }
    }
    return hashMap;
}

console.log(optimizeString('aabddddccccffff'));