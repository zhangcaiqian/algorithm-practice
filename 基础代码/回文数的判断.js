const checkPalindrome = (data) => {
    if(data < 0) {
        return false;
    }

    let str = String(data);
    let reverseStr = Array.from(str).reverse().join('');

    return str === reverseStr;
}