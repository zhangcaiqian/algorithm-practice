const getNumbers = (arr, k) => {
    const len = arr.length;
    if(len === 0 || !k) return [];

    const objArr = arr.map((item, index) => { return {value: item, index: index}});
    const sortedObjArr = objArr.sort((a, b) => a.value - b.value).slice(0, k);

    return sortedObjArr.sort((a, b) => a.index - b.index);
};

getNumbers([1,2,3,4,2,3],4);
