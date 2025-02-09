const WARN = console.warn;

/**
 * 2
 * 调用一个函数 函数会返回一个promise
 * 如果reject 则继续调用
 * 如果resolve则停止调用
 * 最多调用TIME次
 */
WARN(
  '2 调用一个函数 函数会返回一个promise 如果reject 则继续调用 如果resolve则停止调用 最多调用TIME次',
);
async function toTry(time, fn) {
  if (time === 0) return;
  try {
    return await fn();
  } catch (error) {
    return await toTry(time - 1, fn);
  }
}

/**
 * 3
 * 数组乱序
 */
WARN('3 数组乱序');
function randomSort(arr) {
  return arr.sort((a, b) => {
    return Math.random() - 0.5;
  });
}
let arr = [1, 2, 3, 4, 5, 6];
console.log('randomSort', randomSort(arr));

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * 4
 * 深度clone
 */
WARN('4 深度clone');
function deepClone(baseObj) {
  if (Array.isArray(baseObj)) return [...baseObj];

  let myObj = {};
  Object.entries(baseObj).forEach(([key, value], idx) => {
    if (typeof value == 'object') {
      if (value == null) myObj[key] = null;
      else if (Array.isArray(value)) myObj[key] = [...value];
      else myObj[key] = deepClone(value);
    } else {
      myObj[key] = value;
    }
  });
  return myObj;
}

let baseObj = {
  person: {
    name: 'baseobj',
  },
};
let deriveObj = deepClone(baseObj);
deriveObj.person.name = 'deriveObj';
console.log('deriveOb: ', deriveObj);
console.log('baseObj: ', baseObj);

//第二种方法
function deepCloneSecondMethod(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 5
 * 队列问题 ali
 * firstPromise 只有当第一个promise 函数执行完成后 后边的函数才能执行
 */
WARN('5 队列问题 ali');

function firstPromise(promiseFunction) {
  let flag = true;
  return function () {
    return new Promise((res, rej) => {
      if (flag) {
        flag = false;
        promiseFunction().then((count) => {
          flag = true;
          res(count);
        });
      } else res();
    });
  };
}
let count = 1;
const promiseFunction = () => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(count++);
    });
  });
};
const firstFn = firstPromise(promiseFunction);
firstFn().then(console.log); // 1
firstFn().then(console.log); // 无输出

/**
 * 6 判断两个对象是否相等  深比较
 */
WARN('6 判断两个对象是否相等  深比较');
function isEqual(obj_1, obj_2) {
  let isEqualFlag = false;
  if (obj_1 == obj_2) isEqualFlag = true;
  else {
    for (let i = 0; i < Object.keys(obj_1).length; i++) {
      let key = Object.keys(obj_1)[i];
      let val_1 = obj_1[key];
      let val_2 = obj_2[key];
      if (typeof val_1 != 'object' && typeof val_2 != 'object') {
        isEqualFlag = val_1 == val_2;
      } else {
        if (val_1 == null && val_2 == null) isEqualFlag = true;
        if (Array.isArray(val_1) && Array.isArray(val_2))
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
 * 8 手动实现 instanceof
 * 原理 ins.__proto__ 其实就是指的 Person.prototype对象
 */
function _instanceOf(insObj, obj) {
  let insObjProto = insObj;
  let objProto = obj.prototype;
  while (true) {
    insObjProto = insObjProto.__proto__;
    if (!insObjProto) return false;
    if (insObjProto === objProto) return true;
  }
}

function Person() {}
let ins = new Person();
console.log('_instanceOf(ins,Object);: ', _instanceOf(ins, Object));

/**
 * 9 jsonp
 * 利用静态资源获取不存在同源策略限制
 */
function jsonP(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  document.querySelector('body').appendChild(script);
  script.onload = function () {
    document.body.removeChild(script);
  };
}

/**
 * 10 this is a pen首字母大写
 * 正则相关
 */
function bigLetter(str) {
  return str
    .split(' ')
    .map((item) => (item = item.slice(0, 1).toLocaleUpperCase() + item.slice(1)))
    .join(' ');
}

function bigLetter(str) {
  'this is a pen'.replace(/\b\w/g, function (match) {
    return match.toLocaleUpperCase();
  });
}

/**
 * 11 获取连续字符
 * 滑动窗口的思路 | 快慢指针
 */
function fun(str) {
  let obj = {};
  let slow = 0;
  let fast = 0;
  while (fast < str.length) {
    if (str[slow] === str[fast]) {
      if (!!obj[str[slow]]) obj[str[slow]] = Math.max(obj[str[slow]], fast - slow + 1);
      else obj[str[slow]] = fast - slow + 1;
      fast += 1;
    } else {
      slow = fast;
    }
  }
  return obj;
}
console.log('series(aaabcaakaaaajbb)', series('aaabcaakaaaajbb')); //{a: 4, b: 2, c: 1, k: 1, j: 1}

/**
 * 12 将一个字符串的大小写取反
 */
function changeLowerUpperCase(str) {
  return str.replace(/([a-zA-Z])/g, function (match) {
    let str = '';
    /[a-z]/.test(match) ? (str = match.toLocaleUpperCase()) : (str = match.toLowerCase());
    return str;
  });
}
console.log('changeLowerUpperCase: ', changeLowerUpperCase('aBc'));

/**
 * 13 数组连续性判断
 * ? reduce 函数如果有初始值 则idx是从0开始计算 pre指的是初始值 curr是0下标指向的元素
 * ? 没有初始值  则idx是从1开始计算 pre指的是1-1 curr是1下标指向的元素
 * ? 后边的pre就是return返回的值
 */
function arrSeriesFun(arr) {
  let myArr = [arr[0]];
  let idx = 0;
  arr.reduce((pre, curr, innerIdx) => {
    if (pre + 1 == curr) {
      myArr[idx].push(curr);
    } else {
      idx++;
      myArr[idx] = [curr];
    }
    return curr;
  }, arr[0]);
  return myArr;
}
// function arrSeriesFun(arr){
//   if(arr.length<=1) return arr;
//   let newArr = [[arr[0]]];
//   let indiactor = 0;
//   for(let i=1;i<arr.length;i++){
//     let __arr = newArr[indiactor];
//     let preNum = __arr[__arr.length-1];
//     let nowNum = arr[i];
//     if(preNum+1 == nowNum) {
//       __arr.push(nowNum);
//     }else{
//       newArr.push([nowNum]);
//       indiactor++;
//     }
//   }
//   return newArr;
// }

// 滑动窗口 双指针
function arrSeriesFun(array) {
  let l = 0;
  let r = 0;
  let res = [];
  while (l <= array.length - 1) {
    if (l === r && l === 0) {
      r++;
      continue;
    }
    if (array[r] + 1 == array[r + 1]) {
      r++;
    } else {
      const x = array.slice(l, r + 1);
      res.push(x);
      l = r + 1;
      r = r + 1;
    }
  }
  return res;
}

console.log('arrSeriesFun([1,2,3,5,8,10,11]): ', arrSeriesFun([1, 2, 3, 5, 8, 10, 11])); //[ 1, [ 1, 2, 3 ], [ 5 ], [ 8 ], [ 10, 11 ] ]

/**
 * 14 数组的flat方法实现
 */
function flat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log('flat:', flat([1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]));
// [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]].flat(Infinity)
function flat(arr) {
  let res = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (Array.isArray(element)) {
      res = res.concat(flat(element));
    } else {
      res.push(element);
    }
  }
  return res;
}

/**
 * 16 数组去重 || hashMap
 *  let arr = [[1,2,3],[1,'2',3],[1,2,3]]
 *  let myArr=  [...new Set(arr.map(item=>JSON.stringify(item)))].map((item)=>JSON.parse(item))
 */
function mySet(arr) {
  arr = arr
    .map((item) => JSON.stringify(item))
    .filter((value, idx, arr) => {
      return arr.indexOf(value) == idx;
    })
    .map((item) => JSON.parse(item));
  console.log('arr: ', arr);
}

function mySet(array) {
  const cache = {};
  const res = [];
  array.forEach((element) => {
    if (!cache[JSON.stringify(element)]) {
      cache[JSON.stringify(element)] = true;
      res.push(element);
    }
  });
  console.log('res: ', res);

  return res;
}

mySet([
  [1, 2, 3],
  [1, '2', 3],
  [1, 2, 3],
]);

/**
 * 17 对象的扁平化
 */

let objFlatObj = {
  a: {
    b: {
      c: {
        d: 1,
      },
    },
  },
  aa: 2,
  c: [1, 2],
};

function objFlat(objFlatObj) {
  let res = {};
  Object.entries(objFlatObj).forEach(([key, value], idx) => {
    if (typeof value === 'object' && !Array.isArray(value && value != null)) {
      const cookedValue = objFlat(value);
      Object.entries(cookedValue).forEach(([k, v]) => {
        res[`${key}.${k}`] = v;
      });
    } else {
      res[key] = value;
    }
  });
  return res;
}

console.log('objFlat(objFlatObj);: ', JSON.stringify(objFlat(objFlatObj))); //{"a.b.c.d":1,"aa":2,"c":[1,2]}

/**
 * 18 对象的展开
 */
function openObj(obj) {
  const res = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (key.includes('.')) {
      let obj = {};
      const firstCharBeforeFirstDot = key.split('.').slice(0, 1);
      const restCharsAfterFirstDot = key.split('.').slice(1);
      obj[restCharsAfterFirstDot.join('.')] = value;
      res[firstCharBeforeFirstDot] = openObj(obj);
    } else {
      res[key] = value;
    }
  });
  return res;
}

console.log(
  'openObj({"a.b.c.d":1,"aa":2,"c":[1,2]}): ',
  openObj({ 'a.b.c.d': 1, aa: 2, c: [1, 2] }),
);

/**
 * 19  利用引用传值的特性
 */
/**
 * [{
 *    {
 *    id:1,name:'部门A',parentId:0,
 *    child:[
 *      {id:3,name:'部门C',parentId:1},
 *      {id:4,name:'部门D',parentId:1},
 *    ]},
 *    {
 *    id:2,name:'部门B',parentId:0,
 *    child:[
 *      {id:5,name:'部门E',parentId:2},
 *      {id:7,name:'部门G',parentId:2},
 *    ]},
 * }]
 **/
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 },
];

function convert(list) {
  return list.filter((ele) => {
    let child = list.filter((item) => {
      if (item.parentId == ele.id) {
        return item;
      }
    });
    if (child.length) ele.child = child;
    return ele.parentId == 0;
  });
}

// Another solution
function buildTree(data, parentId) {
  let tree = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === parentId) {
      let node = data[i];
      let children = buildTree(data, node.id);
      if (children.length > 0) {
        node.children = children;
      }
      tree.push(node);
    }
  }
  return tree;
}

let result = buildTree(list, 0);

console.log('convert(list): ', convert(list));

function listToTree(list) {
  // 使用对象重新存储数据, 空间换时间
  let map = {};
  // treeData存储最后结果
  let treeData = [];
  // 遍历原始数据data，存到map中，id为key，值为数据
  for (let i = 0; i < list.length; i++) {
    map[list[i].id] = list[i];
  }
  // 遍历对象
  for (let i in map) {
    // 根据 parentId 找到的是父节点
    if (map[i].parentId) {
      if (!map[map[i].parentId].children) {
        map[map[i].parentId].children = [];
      }
      // 将子节点放到父节点的 children中
      map[map[i].parentId].children.push(map[i]);
    } else {
      // parentId 找不到对应值，说明是根结点，直接插到根数组中
      treeData.push(map[i]);
    }
  }
  return treeData;
}

/**
 * Lazy man
 */
class Tom {
  constructor() {
    this.queue = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }
  next() {
    let fun = this.queue.pop();
    fun && fun();
  }
  eat(value) {
    let fun = () => {
      console.log(value);
      this.next();
    };
    this.queue.push(fun);
    return this;
  }
  sleepFirst(gap) {
    let fun = () => {
      setTimeout(() => {
        this.next();
      }, gap);
    };
    this.queue.unshift(fun);
    return this;
  }
  sleep(gap) {
    let fun = () => {
      setTimeout(() => {
        this.next();
      }, gap);
    };
    this.queue.push(fun);
    return this;
  }
  play(value) {
    let fun = () => {
      console.log(value);
      this.next();
    };
    this.queue.push(fun);
    return this;
  }
}
new Tom().eat('apple').sleep(2000).play('soccer').sleepFirst(1000);

/**
 * @param {*} nums
 * @param {*} k
 * 滑动窗口
 * 滑动窗口的位置                  最大值
 * -------------------         ---------
 * [1 3 -1] -3 5 3 6 7            3
 * 1 [3 -1 -3] 5 3 6 7            3
 * 1 3 [-1 -3 5] 3 6 7            5
 * 1 3 -1 [-3 5 3] 6 7            5
 * 1 3 -1 -3 [5 3 6] 7            6
 * 1 3 -1 -3 5 [3 6 7]            7
 */
function slideWindow(nums, k = 3) {
  let l = 0;
  let r = l + k - 1;
  let res = [];
  while (r <= nums.length - 1) {
    let nowArrs = nums.slice(l, r + 1);
    res.push(Math.max(...nowArrs));
    l += 1;
    r += 1;
  }
  return res;
}
console.log('slideWindow([1,3,-1,-3,5,3,6,7],3): ', slideWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); //[ 3, 3, 5, 5, 6, 7 ]

/**
 * Array.splice 方法实现
 */
Array.prototype.splice = function (...args) {
  // let startIdx = args[0];
  // let deleteCount = args[1];
  // let otherData = args.slice(2);
  let [startIdx, deleteCount, ...otherData] = args;
  let myarr = [];
  let originArr = Object(this);

  if (args.length == 1) myarr = originArr.slice(0, startIdx);
  if (args.length == 2)
    myarr = [...originArr.slice(0, startIdx), originArr.slice(startIdx + deleteCount)];
  if (args.length > 2) {
    myarr = [...originArr.slice(0, startIdx), otherData, originArr.slice(startIdx + deleteCount)];
  }
  for (let i = 0; i < myarr.length; i++) originArr[i] = myarr[i];
  originArr.length = myarr.length;
};

/**
 * 最长不重复子串求和
*    [
*       'p',
        'pw',
        'w',
        'wk',
        'wke',
        'kew'
*    ]
 */
var lengthOfLongestSubstr = function (s) {
  if (!s) return 0;
  let maxSubStrArr = [s[0]];
  for (let i = 1; i < s.length; i++) {
    let nowI = s[i];
    let preSubStr = maxSubStrArr[i - 1];
    let j = preSubStr.length - 1;
    for (; j >= 0; j--) {
      let nowJ = preSubStr[j];
      if (nowI == nowJ) break;
    }
    maxSubStrArr.push(`${preSubStr.slice(j + 1)}${nowI}`);
  }
  console.log('maxSubStrArr: ', maxSubStrArr);
};
lengthOfLongestSubstr('bbbbb');
console.log('lengthOfLongestSubstr(): ', lengthOfLongestSubstr('pwwkew'));

/**
 * 求目标和
 * [
    [7],
    [2,2,3]
  ]
  回溯 递归 hash缓存
 */
function calculateSumOfTarget(material, target) {
  let res = [];
  function assist(material, historyPath, historySum) {
    for (let index = 0; index < material.length; index++) {
      const element = material[index];
      const currentSum = element + historySum;
      if (currentSum === target) {
        res.push(historyPath.concat(element));
      }
      // Get this. We need to use index===0 to cut off branches of the tree.
      if (currentSum < target && index === 0) {
        assist(material, [...historyPath, element], currentSum);
      }
    }
  }
  assist(material, [], 0);
  return res;
}
fun([2, 3, 6, 7], 7);

//~ JS给数字加千位分隔符  三位分隔
function numFormat(num) {
  var res = num.toString().replace(/\d+/, function (n) {
    // 先提取整数部分w
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}

var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"

/* 红包算法  二倍均值法 https://blog.csdn.net/bjweimengshu/article/details/80045958
 * 假设有10个人,总红包为100.
 * (100/10) * 2  = [0,20]  平均为10
 * （90/9）* 2 = [0,20]  平均为10
 */
function redPackage(amount, num) {
  if (num == 1) return [amount];
  let redPackageAmount = (Math.random() * ((amount / num) * 2)).toFixed(2);
  return [redPackageAmount, ...redPackage(amount - redPackageAmount, num - 1)];
}

let arrNum = redPackage(100, 10).map((item) => parseFloat(item));
console.log('arr: ', arrNum);
let total = arrNum.reduce((pre, curr) => {
  return pre + curr;
});
console.log('total: ', total);

//~ 实现一个简易的模板引擎
function render(template, obj) {
  // 代码实现
  let re;
  if (template.includes('${')) {
    re = /\$\{\s*(.+?)\s*\}/g;
  } else {
    re = /\{\{\s*(.+?)\s*\}\}/g;
  }

  let results = template.matchAll(re);
  for (let match of results) {
    with (obj) {
      template = template.replace(match[0], eval(match[1]));
    }
  }
  return template;
}

templateStr = render(
  // '你好，我们公司是{{company}}，我们属于{{group.name}}业务线，我们在招聘各种方向的人才，包括{{group.jobs[0]}}、{{group["jobs"][1]}}等。',
  'hello, ${b}, ${d[0].e} word',
  {
    b: 'b',
    d: [
      {
        e: 'e',
      },
    ],
    group: {
      name: '天猫',
      jobs: ['前端'],
      sort: {
        xxx: 'yyy',
      },
    },
    company: '阿里',
  },
);

/**
 * implement useInterval function (byteDance)
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */

/**
 * what will happen when new a object.
 * this is logic code.
 */

var createObject = function () {
  var obj = new Object(), //(1)
    Constructor = [].shift.call(arguments); //(2)
  obj.__proto__ = Constructor.prototype; //(3)
  var ret = Constructor.apply(obj, arguments); //(4)
  return typeof ret === 'object' ? ret : obj; //(5)
};
var Freak = createObject(Rocker, 'Freak');
console.log(Freak.name); //Freak
console.log(Freak.getName()); //Freak
console.log(Object.getPrototypeOf(Freak) === Rocker.prototype); //true

// ===================函数的颗粒化问题=============================================

function curry(totalCount) {
  let dataCache = [];
  function assistant(...args) {
    dataCache = dataCache.concat(args);
    if (dataCache.length === totalCount) {
      const res = dataCache.reduce((a, b) => {
        return a + b;
      }, 0);
      dataCache = [];
      return res;
    } else return assistant;
  }
  return assistant;
}

let sum4 = curry(4);

console.log(sum4(1, 2, 3, 4)); // 10
console.log(sum4(1, 2)(3, 4)); // 10
console.log(sum4(1)(2, 3, 4)); // 10
console.log(sum4(1)(2)(3, 4)); // 10
console.log(sum4(1)(2)(3)(4)); // 10

// 在一个一维坐标，给出一个目标线段，例如(3, 8)。
// 一组源线段，例如(1, 2),(3, 4), (5, 8), (3, 6)。
// 判断源线段组成的合集是否能完全覆盖目标线段，返回 true 或 false

// ini 代码解读复制代码输入:
// const data = [3, 8];
// const source = [[1, 2], [3, 4], [5, 8], [3, 6]];
// 输出:
// true
