// https://juejin.im/post/5cff49e75188257a6b40de80#heading-4
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

public static void insertSort(int[] arr) {
  int n = arr.length;
  for (int i = 1; i < n; ++i) {
    int value = arr[i];
    int j = 0;//插入的位置
    for (j = i - 1; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j + 1] = arr[j];//移动数据
      } else {
        break;
      }
    }
    arr[j + 1] = value; //插入数据
  }
}

console.log(selectionSort([1, 2, 355, 3, 7, 4]));
