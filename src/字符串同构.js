/**
 *
 * @param {*} strA
 * @param {*} strB
 * add -> egg
 * paper  -> title
 * kick -> side
 */
function isSomorphic(strA, strB) {
    if (strA.length !== strB.length) {
        return false;
    }
    let len = strA.length;
    const letterMap = {};

    for (i = 0; i < len; i++) {
        let letterA = strA.charAt(i);
        let letterB = strB.charAt(i);
        if (!letterMap[letterA]) {
            letterMap[letterA] = letterB;
        } else if (letterMap[letterA] !== letterB) {
            return false;
        }
    }
    return true;
}

console.log(isSomorphic('add', 'egg'));
console.log(isSomorphic('paper', 'title'));
console.log(isSomorphic('kick', 'side'));
console.log(isSomorphic('abc', 'def'));