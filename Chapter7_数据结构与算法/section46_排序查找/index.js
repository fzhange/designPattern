/**
 * 二分查找
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，
 * 写一个函数二分查找 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 */
let arr = [1,2,3,4,5,6,7,8];
function binarySearch(arr, num) {
  arr.sort((a, b) => {
    return a - b;
  });
  let left = 0;
  let right = arr.length - 1;
  while(left < right){
    let mid = Math.ceil((left + right) / 2);
    if (num == arr[mid]) return mid;
    if (arr[mid] < num) left = mid;
    if (arr[mid] > num)  right = mid;
  }
  return -1;
}
console.log("binarySearch(arr,8): ", binarySearch(arr, 8));

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
  if(arr.length <= 1) return arr;
  let leftArr = [];
  let rightArr = [];
  let mid = Math.floor(arr.length/2);
  for(let i=0;i<arr.length;i++){
    if(i == mid) continue;
    if(arr[i] <= arr[mid])  leftArr.push(arr[i]);
    else rightArr.push(arr[i]);
  }
  return [...quickSort(leftArr),arr[mid],...quickSort(rightArr)];
}
console.log('quickSort',quickSort([2,1,1,4,5]));

/**
 * 冒泡排序
 * 总是比较相邻的两个值
 * 经过第一轮比较 将最大值放在最后
 */
function bubbleSort(arr){
  for(let i=arr.length-1;i>=0;i--){
    for(let j=0;j<i;j++){
      let a = arr[j];
      let b = arr[j+1];
      if(a > b){
        arr[j] = b;
        arr[j+1] = a;
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
function selectSort(arr){
  for(let i=0;i<=arr.length-2;i++){
    for(let j=i+1;j<=arr.length-1;j++){
      let a = arr[i];
      let b = arr[j];
      if(b < a) {
        arr[i] = b;
        arr[j] = a;
      }
    }
  }
  return arr;
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
