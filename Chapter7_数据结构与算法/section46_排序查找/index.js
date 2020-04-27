/**
 * 二分查找
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，
 * 写一个函数二分查找 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 */
let arr = [1, 3, 5, 6, 2, 4, 6, 7, 9, 8];
function binarySearch(arr, num) {
  arr.sort((a, b) => {
    return a - b;
  });
  let left = 0;
  let right = arr.length - 1;
  while (true) {
    if (left < right) {
      let mid = Math.ceil((left + right) / 2);
      if (num == arr[mid]) return mid;
      else if (arr[mid] < num) {
        left = mid + 1;
      } else if (arr[mid] > num) {
        right = mid - 1;
      }
    } else {
      return -1;
    }
  }
}
console.log("binarySearch(arr,8): ", binarySearch(arr, 10));

/**
 * 全排列
 */
function fullpermutate(str) {
  var result = [];
  if (str.length > 1) {
    //遍历每一项
    for (var m = 0; m < str.length; m++) {
      //拿到当前的元素
      var left = str[m]; 
      //除当前元素的其他元素组合  
      var rest = str.slice(0, m) + str.slice(m + 1, str.length);
      //上一次递归返回的全排列
      var preResult = fullpermutate(rest);
      //组合在一起
      for (var i = 0; i < preResult.length; i++) {
        var tmp = left + preResult[i];
        result.push(tmp);
      }
    }
  } else if (str.length == 1) {
    result.push(str);
  }
  return result;
}

console.log('fullpermutate(abc): ', fullpermutate('abc'));


/**
 * 快速排序
 */
function quickSort(arr){
  let len = arr.length;
  let leftArr = [];
  let rightArr = [];
  if(len <= 1) return arr;

  let middle = Math.floor(len/2);
  for(let i=0;i<len;i++){
    if(arr[i] < arr[middle]) leftArr.push(arr[i]);
    if(arr[i] == arr[middle] && i != middle) leftArr.push(arr[i]);
    if(arr[i] > arr[middle]) rightArr.push(arr[i]);
  }
  return [...quickSort(leftArr),arr[middle],...quickSort(rightArr)];
}
console.log('quickSort',quickSort([2,1,1,4,5]));

/**
 * 冒泡排序
 * 总是比较相邻的两个值
 * 经过第一轮比较 将最大值放在最后
 */
function bubbleSort(arr){
  for(let i=arr.length-1;i>0;i--){
   for(let j=0;j<i-1;j++){
     let tmp = arr[j];
     if(arr[j] > arr[j+1]) {
       arr[j] = arr[j+1];
       arr[j+1] = tmp;
     }
   }
  }
  return arr;
}
console.log('bubbleSort([2,1,1,4,5]): ',bubbleSort([2,1,1,4,5]));
/**
 * 选择排序 i like 
 * 用第一个值和后边每一个进行比较
 * 经过一轮比较将最下值放在最前
 * 一轮比较只需要更换一次顺序。
 */
let selectArr = [2,1,1,4,5];
function selectSort(selectArr){
  for(let i=0;i<selectArr.length-1;i++){
    let miniIdx = i;
    for(let j=i+1;j<selectArr.length;j++){
      if(selectArr[miniIdx] > selectArr[j]) miniIdx = j;
    }
    if(i != miniIdx) {
      let tmp = selectArr[miniIdx];
      selectArr[miniIdx] = selectArr[i];
      selectArr[i] = tmp;
    }
  }
  return selectArr;
}
console.log('selectSort',selectSort(selectArr));

/**
 * 版本号排序
 */
let versions = ['4.1', '4.7.1', '4.8', '4.8.0', '4.10', '5'];
versions.sort((a,b)=>{
  let arr1 = a.split('.').map((item)=>parseInt(item));
    let arr2 = b.split('.').map((item)=>parseInt(item));
    let minLen = Math.min(arr1.length,arr2.length);

    for(let i=0;i<minLen;i++){
      if(arr1[i] < arr2[i]) return -1; //返回一个小于0的数字 代表前者的idx比后者的小 无需处理
      if(arr1[i] > arr2[i]) return 1;  //返回一个大于0的数字 代表前者的idx比后者的大 需要进行换位

      //这个是为了区分'4.8'和'4.8.0'的情况
      //前几位大小相同 谁的位数长 谁就在后边
      if(i+1 == minLen){
        if(arr1.length < arr2.length) return -1;
        if(arr1.length > arr2.length) return 1;
      }
    }
})
console.log('versions: ', versions);
