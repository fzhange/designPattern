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

function fullpermutate(str){
  if(str.length == 1) return [[str]];
  let arr = [];
  for(let i=0;i<str.length;i++){
    let nowIChar = str[i];
    let otherStr = str.slice(0,i) + str.slice(i+1);
    let otherStrArr = fullpermutate(otherStr);
    otherStrArr.forEach((item)=>{
      arr.push([`${item[0]}${nowIChar}`]);
    })
  }
  return arr;
}

// function fullpermutate(str){
//   let arr = [];
//   function innerFun(str,preFix=''){
//     if(str.length == 1) {
//       arr.push(`${preFix}${str}`);
//       return;
//     }
//     for(let i=0;i<str.length;i++){
//       let nowIChar = str[i];
//       let otherStr = str.slice(0,i) + str.slice(i+1);
//       innerFun(otherStr,`${preFix}${nowIChar}`);
//     }
//   }
//   innerFun(str);
//   return arr;
// }

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
  function swap(swapArr,i,j){
    let t = swapArr[i]; swapArr[i] = swapArr[j]; swapArr[j] = t;
  }
  function sort(a,b){
    return a-b;
  }
  for(let i=arr.length-1;i>0;i--){
   for(let j=0;j<i-1;j++){
     let tmp = arr[j];
     if(arr[j] > arr[j+1]) {
       swap(arr,i,j);
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
versions.sort((currVersion,preVersion)=>{
  let currArr = currVersion.split('.').map(item=>parseInt(item));
  let preArr = preVersion.split('.').map(item=>parseInt(item));
  let len = Math.min(currArr.length,preArr.length);
  for(let i=0;i<len;i++){
    let currNum = currArr[i];
    let preNum = preArr[i];
    if(currNum > preNum) return 1;
    if(currNum == preArr) continue;
    if(currNum < preArr) return -1;
  }
  if(currArr.length<preArr.length) return -1;
  else return 1;
})
console.log('versions: ', versions);
