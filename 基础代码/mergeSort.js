const merge = (leftArr, rightArr) => {
    const result = [];
  
    while(leftArr.length > 0 && rightArr.length > 0) {
      if(leftArr[0] < rightArr[0]) {
        result.push(leftArr.shift());
      } else {
        result.push(rightArr.shift());
      }
    }
  
    return result.concat(leftArr).concat(rightArr);
  };
  
  const mergeSort = (arr) => {
    if(arr.length === 1) {
      return arr;
    }
  
    const middle = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, middle);
    const rightArr = arr.slice(middle);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
  };
  
  const result = mergeSort([11,22,3,4,553,88]);
  
  console.log(result);
  