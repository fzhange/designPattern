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
 * 6 判断两个对象是否相等  深比较
 */
WARN("6 判断两个对象是否相等  深比较");
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
  static async race(...promiseList){
    return new Promise((resolve,reject)=>{
      for(let promise of promiseList){
        promise.then((value)=>{
          resolve(value);
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
Promise_2.race(pro_1,pro_2).then((val)=>{
  console.log('race val: ', val);
})

/**
 * 8 手动实现 instanceof
 * 原理 ins.__proto__ 其实就是指的 Person.prototype对象
 */

function _instanceOf(insObj,obj){
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

/**
 * 10 this is a pen首字母大写
 * 正则相关
 */

function bigLetter(str){
  return str.split(' ').map(item=> item = item.slice(0,1).toLocaleUpperCase() + item.slice(1)).join(' ');
}

function bigLetter(str){
  return str.replace(/\b(\w+)\b/g,function(match,key){ //注意 \b g 
    console.log('match,key: ', match,key);
    return match.slice(0,1).toLocaleUpperCase() + match.slice(1);
  })
}
/**
 * 11 获取连续字符
 * 'aaabcaakaaaajbb'
 * {
 *  a:4,
 *  b:2
 * }
 * /(.)\1/ 圆括号规则匹配的内容为一个临时缓冲区，\1引用第一个圆括号规则所匹配度的内容。
 */
function series(str){
  let obj = {}
  let arr = str.match(/(\w)\1+/g);  // ['aaa','aa','aaaa','bb'];
  for(let i=0;i<arr.length;i++){
    let item = arr[i];
    let ele = item[0];
    if(obj[ele]) obj[ele] = Math.max(item.length,obj[ele]);
    else obj[ele] = item.length;
  }
  return obj;
}
console.log('series(aaabcaakaaaajbb)',series('aaabcaakaaaajbb')); //{ a: 4, b: 2 }

/**
 * 12 将一个字符串的大小写取反
 */
function changeLowerUpperCase(str){ 
  return str.replace(/([a-zA-Z])/g,function(match){
    let str = '';
    /[a-z]/.test(match) ? str = match.toLocaleUpperCase() : str = match.toLowerCase();
    return str;
  });
}
console.log('changeLowerUpperCase: ', changeLowerUpperCase('aBc'));

/**
 * 13 数组连续性判断
 */
function arrSeriesFun(arr){
  let myArr = [...arr] //引用传值  进行数组copy
  myArr.sort((x,y) => x-y) //排序
  let newArr = [[]];
  let idx = 0;
  myArr.reduce((pre,curr,innerIdx)=>{
    if(innerIdx != 0){
      if(pre+1 == curr){
        newArr[idx].push(curr);
      }else{
        newArr[++idx] = [curr];
      }
    }else{
      newArr[idx] = [curr];
    }
    return curr;
  },0)
  return newArr;
}


console.log('arrSeriesFun([1,2,3,5,8,10,11]): ', arrSeriesFun([1,2,3,5,8,10,11]));

/**
 * 14 数组的flat方法实现
 */
function flat(arr){
  while(arr.some((item)=>Array.isArray(item))){
    arr = [].concat(...arr);
  }
  return arr;
}
console.log('flat:',flat([1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]));

/**
 * 15 求两个数组的交集
 * hash表算法 以空间换取时间
 * 先用hash表存储arr1元素出现的个数。
 * 遍历arr2,发现arr2的元素和hash表的key对应，然后就将数据添加到myarr中，然后个数-1.等于0时删除对应key。
 */
function subnet(arr1,arr2){
  let obj = {};
  let myArrr = [];
  Object.entries(arr1).forEach(([idx,value]) => {
    !!obj[value] ? obj[value] = obj[value]+1 : obj[value]=1;
  });
  Object.entries(arr2).forEach(([idx,value])=>{
    if(obj[value]){
      myArrr.push(value);
      obj[value] = obj[value] - 1
      if(obj[value]<=0) delete obj[value];
    }
  })
  return myArrr;
}
console.log('subnet([1,2,2,1],[2,3,2]): ', subnet([1,2,2,1],[2,3,2]));

/**
 * 16 数组去重
 *  let arr = [[1,2,3],[1,'2',3],[1,2,3]]
 *  let myArr=  [...new Set(arr.map(item=>JSON.stringify(item)))].map((item)=>JSON.parse(item))
 */
 function mySet(arr){
    arr = arr.map(item=>JSON.stringify(item)).filter((value,idx,arr)=>{
      return arr.indexOf(value) == idx
    }).map(item=>JSON.parse(item))
    console.log('arr: ', arr);
 }

 /**
  * 17 对象的扁平化
  */

 let objFlatObj  = {
  "a": {
    "b": {
      "c": {
        "d": 1
      }
    }
  },
  "aa": 2,
  "c": [1,2]
}

function objFlat(objFlatObj){
  let newObj = {}
  function innerFun(innerObj,parentKeyName=''){
    Object.entries(innerObj).forEach(([key,value])=>{
      if(typeof value != "object" || Array.isArray(value) || value == null){
        newObj[`${parentKeyName}${key}`] = value;
      }else{
        innerFun(value,`${parentKeyName}${key}.`)
      }
    })
  }
  innerFun(objFlatObj);
  return newObj;
}

console.log('objFlat(objFlatObj);: ', JSON.stringify(objFlat(objFlatObj))); //{"a.b.c.d":1,"aa":2,"c":[1,2]}

/**
 * 18 对象的展开
 */

function openObj(obj){
  let newObj = {}
  Object.entries(obj).forEach(([key,value])=>{
    if(key.includes(".")){
      let keylist = key.split('.')
      keylist.reduce((pre,curr,innerIdx)=>{ 
        if(innerIdx == keylist-1){
          pre[curr] = value;
        }else{
          pre[curr] = {}
        }
        return pre[curr];   //利用引用传值的特性
      },newObj)
    }else{
      newObj[key] = value;
    }
  })
  return newObj;
}

console.log('openObj({"a.b.c.d":1,"aa":2,"c":[1,2]}): ', openObj({"a.b.c.d":1,"aa":2,"c":[1,2]}));

/**
 * 19  利用引用传值的特性
 */
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];

function convert(list){
  return list.filter((ele)=>{
    let child = list.filter((item)=>{
      if(item.parentId == ele.id){
        return item;
      }
    })
    if(child.length) ele.child = child
    return ele.parentId == 0;
  })
}
console.log('convert(list): ', convert(list));
