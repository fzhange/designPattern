const WARN = console.warn;

/**
 * 1
 * 变量作用域问题
 */
inner = "window";
const obj1 = (function () {
  var inner = "1-1";
  return {
    say: function () {
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
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
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


/**
 * 4 async await eventloop
 * 你真的了解 await吗 ？
 */

async function async2() {
  console.log('6666');
  return new Promise((res) => {
    res(1000)
  })
}
async function async1() {
  let x = await async2();
  console.log('async1 end', x)   //3
}
async1()
new Promise((resolve, reject) => {
  console.log('promise1') //1
  resolve();
}).then(() => {
  console.log('promise2') //2
})

// promise 自包裹示例
// await new Promise((resolve,reject)=>{
//   resolve()
// }).then(()=>{
//   async2();
// })




//! ---------------------------------------

async function async1() {
  let x = await new Promise((resolve) => {
    resolve(1200);
  })
  console.log('async1 end', x)  //2 
}
async1()
new Promise((resolve, reject) => {
  console.log('promise1')  //1
  resolve();
}).then(() => {
  console.log('promise2') //3
})

//! --------------------------------------


async function async1() {
  let x = await 100;
  console.log('async1 end', x)   //2 
}
async1()
new Promise((resolve, reject) => {
  console.log('promise1')    //1
  resolve();
}).then(() => {
  console.log('promise2') //3
})

/**
 * 5 
 */
const a = {}
const b = Symbol('1')
const c = Symbol('1')
a[b] = '子君'
a[c] = '君子'

// 我是子君还是君子呢
console.log(a[b])

const d = {}
const e = { key: '1' }
const f = { key: '2' }
d[e] = '子君'
d[f] = '君子'

// 我是子君还是君子呢
console.log(d[e])
