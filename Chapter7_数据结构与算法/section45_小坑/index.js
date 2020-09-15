const WARN = console.warn;

/**
 * 1
 * 变量作用域问题
 */
inner = "window";
const obj1 = (function() {
  var inner = "1-1";
  return {
    say: function() {
      console.log(inner);
    }
  };
})();

/**
 * 2
 * 数组长度问题
 */
let arr = [];
arr[2] = 2;
console.log(arr.length); //3
console.log(Object.entries(arr).length); //1
for (const item of arr) {
  console.log(item); //undefined undefined 2
}
for (const [idx, item] of Object.entries(arr)) {
  console.log("idx,item: ", idx, item); //idx,item:  2
}

/**
 * 3
 * 数组长度为2即
 * [empty,empty]
 * 然后push 
 * [empty,empty,1,2,3] length:5
 * {
 *  2:1,
 *  3:2,
 *  4:3
 * }
 * 覆盖原有的{
 *  2:3,
 *  3:4
 * }
 */

var obj = {
  '2':3,
  '3':4,
  'length':2,
  'splice':Array.prototype.splice,
  'push':Array.prototype.push
}
obj.push(1)
obj.push(2)
obj.push(3)
console.log(obj)









// {
//   '2':1
//   '3':2,
//   '4':3,
//   'length':5,
//   'splice':Array.prototype.splice,
//   'push':Array.prototype.push
// }


