const WARN = console.warn;

/**
 * 1
 * sum求和问题
 */
WARN("1 sum求和问题");
const sum = (function() {
  let queue = [];

  function _sum() {
    let arg = Array.prototype.slice.call(arguments);
    if (arg.length > 0) {
      queue = queue.concat(arg);
      return _sum;
    } else {
      let totalNum = queue.reduce((pre, curr, idx, arr) => {
        console.log("pre,curr,idx,arr: ", pre, curr, idx, arr);
        return pre + curr;
      });
      queue = [];
      return totalNum;
    }
  }

  return _sum;
})();
console.log(" sum(100,200)(300)(100,100,100)(): ", sum(100, 200)(300)(100, 100, 100)());

/**
 * 2
 * 调用一个函数 函数会返回一个promise
 * 如果reject 则继续调用
 * 如果resolve则停止调用
 * 最多调用TIME次
 */
WARN(
  "2 调用一个函数 函数会返回一个promise 如果reject 则继续调用 如果resolve则停止调用 最多调用TIME次"
);
async function toTry(time, fn) {
  try {
    for (let i = 0; i < time; i++) {
      //如果await操作成功，就会使用break语句退出循环;如果失败，会被catch语句捕捉，然后进入下一轮循环。
      await fn();
      break;
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * 3
 * 数组乱序
 */
WARN("3 数组乱序");
function randomSort(arr) {
  return arr.sort((a, b) => {
    return Math.random() - 0.5;
  });
}
let arr = [1, 2, 3, 4, 5, 6];
console.log("randomSort", randomSort(arr));

/**
 * 4
 * 深度clone
 */
WARN("4 深度clone");
function deepClone(obj) {
  if (Array.isArray(obj)) return [...obj];
  else {
    let tmp = {};
    Object.keys(obj).forEach((key, idx) => {
      let item = obj[key];
      if (typeof item == "object") {
        tmp[key] = deepClone(item);
      } else {
        tmp[key] = item;
      }
    });
    return tmp;
  }
}
let baseObj = {
  person: {
    name: "baseobj"
  }
};
let deriveObj = deepClone(baseObj);
deriveObj.person.name = "deriveObj";
console.log("deriveOb: ", deriveObj);
console.log("baseObj: ", baseObj);

//第二种方法
function deepCloneSecondMethod(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 5
 * 队列问题 ali
 * firstPromise 只有当第一个promise 函数执行完成后 后边的函数才能执行
 */
WARN("5 队列问题 ali");

function firstPromise(promiseFunction) {
  let flag = true;
  return function() {
    let _promise = null;
    if (flag) {
      _promise = promiseFunction();
      flag = false;
      return new Promise((resolve, reject) => {
        _promise.then(val => {
          flag = true;
          resolve(val);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }
  };
}
let count = 1;
const promiseFunction = () => {
  return new Promise(rs => {
    window.setTimeout(() => {
      rs(count++);
    });
  });
};
const firstFn = firstPromise(promiseFunction);
firstFn().then(console.log); // 1
firstFn().then(console.log); // 无输出

/**
 * 6 判断两个对象是否相等
 */
WARN("6 判断两个对象是否相等");
function isEqual(obj_1, obj_2) {
  let isEqualFlag = false;
  if (obj_1 == obj_2) isEqualFlag = true;
  else {
    for (let i = 0; i < Object.keys(obj_1).length; i++) {
      let key = Object.keys(obj_1)[i];
      let val_1 = obj_1[key];
      let val_2 = obj_2[key];
      if (typeof val_1 != "object" && typeof val_2 != "object") {
        isEqualFlag = val_1 == val_2;
      } else {
        if (val_1 == null && val_2 == null) isEqualFlag = true;
        if (Array.isArray(val_1) && Array.isArray(val_1))
          isEqualFlag = JSON.stringify(val_1) == JSON.stringify(val_2);
        else {
          isEqualFlag = isEqual(val_1, val_2);
        }
      }
      if (!isEqualFlag) break;
    }
  }
  return isEqualFlag;
}

/**
 * 7 Promise.all的实现
 * Promise.all 入参的是一个数组 返回的是一个Promise实例
 * 主要难点 eg Promise.all([A,B,C]) 如何判断A B C 三个promise都进入resolve状态 
 */

class Promise_2 {
  static async all(promiseList){
    let resolveValList = [];
    // for(const [idx,promise] of Object.entries(promiseList)){
    //   //此处是顺序的 不怎么好  
    //   resolveValList[i] = await promise
    // }
    // return resolveValList;

    return new Promise((resolve,reject)=>{
      for(const [idx,promise] of Object.entries(promiseList)){
        promise.then((val)=>{
          resolveValList[idx] = val;
          if(Object.entries(resolveValList).length == promiseList.length) {
            /** 重点是这个if判断逻辑 **/
            resolve(resolveValList)
          }
        }).catch((err)=>{
          reject(err);
        })
      }
    })
  }
}
//使用
let pro_1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(1);
  },3000)
})
let pro_2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(2);
  },1000)
})
Promise_2.all([pro_1,pro_2]).then((val)=>{
  console.log('val: ', val);
}).catch((err)=>{
  console.log('err: ', err);
})

/**
 * 8 手动实现 instanceof
 * 原理 ins.__proto__ 其实就是指的 Person.prototype对象
 */

function _instanceOf(ins,obj){
  let insObjProto =  insObj.__proto__;
  let objProto = obj.prototype;
  while(true){
    if(!insObjProto) return false;
    if(insObjProto === objProto) return true;
    insObjProto = insObjProto.__proto__;
  }
}

function Person(){}
let ins = new Person();
console.log('_instanceOf(ins,Object);: ', _instanceOf(ins,Object)); 


/**
 * 9 jsonp
 * 利用静态资源获取不存在同源策略限制
 */

function jsonP(src){
  const script = document.createElement('script');
  script.src = src;
  script.type = "text/javascript";
  document.querySelector('body').appendChild(script);
  script.onload = function(){
    document.body.removeChild(script);
  }
}


