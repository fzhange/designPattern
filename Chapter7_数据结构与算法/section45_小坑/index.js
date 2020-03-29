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
  console.log("idx,item: ", idx, item); //idx,item:  2 2
}
