const permutation = (str) => {
    const result = [];
    if (str.length === 1) {
        result.push(str);
    }
    for(let i = 0; i < str.length; i++) {
        const currentStr = str[i];
        const leftStr = str.slice(0, i) + str.slice(i + 1, str.length);
        console.log(i, leftStr);
        const preResult = permutation(leftStr);
        for(let j = 0; j < preResult.length; j++) {
            const temp = currentStr + preResult[j];
            result.push(temp);
        }
    }
    return result;
}

console.log(permutation('123'));
