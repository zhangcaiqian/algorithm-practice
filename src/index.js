function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        var temp = arr[j + 1]; // 元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([1, 2, 355, 3, 7, 4]));

function selectionSort(arr) {
  const len = arr.length;
  let minIndex, tempItem;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    tempItem = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = tempItem;
  }
  return arr;
}

console.log(selectionSort([1, 2, 355, 3, 7, 4]));
