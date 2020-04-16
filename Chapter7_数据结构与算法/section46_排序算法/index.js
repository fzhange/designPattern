/**
 * 二分查找
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，
 * 写一个函数二分查找 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 */
let arr = [1, 3, 5, 6, 2, 4, 6, 7, 9, 8];
function search(arr, num) {
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
console.log("search(arr,8): ", search(arr, 10));

/**
 *
 */

function fullpermutate(str) {
  console.log('str: ', str);
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
