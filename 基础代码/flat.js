const data = [1, [2, [[3, 4], 5], 6]];

console.log(Array(data.toString()));

const flat = (data) => {
    const result = [];
    const innerFlat = (data) => {
        data.forEach((item) => {
            if (Array.isArray(item)) {
                innerFlat(item);
            } else {
                result.push(item);
            }
        });
    }
    innerFlat(data);
    return result;
}
console.log(flat(data));