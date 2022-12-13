// 1、实现一个 Promise.allFinally
// 示例：
// Promise.all(iterable) 返回一个Promise实例 其完成的条件是 iterable 中所有的 promise 都完成（resolved）
// Promise.race(iterable)返回一个Promise实例 其完成的条件是 iterable 中某一个 promise 完成（resolved）
//   实现 Promise.allFinally(iterable) 返回一个Promise实例， 完成的条件是 iterable 中所有的 promise 执行完毕就算 Promise.allFinally 完成
// 说明：无论每个promise 执行结果是完成(resolved)或者是拒绝(rejected) ，只要该 promise 返回结果就算执行完毕。

MyPromise.allFinally = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : []
    let len = promises.length
    const argslen = len
    // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
    if (len === 0) return resolve([])
    // 将传入的参数转化为数组，赋给args变量
    let args = Array.prototype.slice.call(promises)
    // 计算当前是否所有的 promise 执行完成，执行完毕则resolve
    const compute = () => {
      if (--len === 0) {
        resolve(args)
      }
    }
    function resolvePromise(index, value) {
      // 判断传入的是否是 promise 类型
      if (value instanceof MyPromise) {
        const then = value.then
        then.call(value, function (val) {
          args[index] = { status: 'fulfilled', value: val }
          compute()
        }, function (e) {
          args[index] = { status: 'rejected', reason: e }
          compute()
        })
      } else {
        args[index] = { status: 'fulfilled', value: value }
        compute()
      }
    }

    for (let i = 0; i < argslen; i++) {
      resolvePromise(i, args[i])
    }
  })
}




2.一个无序的正整数数组，
1、找出数组中重复最多的数字。
2、重复最多的数字最先开始的位置。
3、重复最多的数字的数量。
// const a = [1, 5, 2, 3, 4, 1, 1, 1	];
// 输出： 1 0 4

function findMaxRepeatNum(arr) {
  let countMap = {};
  for (var i = 0; i < arr.length; i++) {
    let key = arr[i];
    console.log('key: ', key);
    if (!countMap[key]) {
      countMap[arr[i]] = {
        key, //数组中重复最多的数字。
        count: 1, //重复最多的数字的数量。
        firstIdx: i, //重复最多的数字最先开始的位置。
      };
    } else {
      let originCount = countMap[arr[i]].count;
      // let firstIdx = countMap[arr[i]];
      countMap[arr[i]] = {
        ...countMap[arr[i]],
        count: originCount + 1,
      };
    }
  }
  let resList = [];
  Object.entries(countMap).forEach(([key, val]) => {
    resList.push(val);
  });
  //逆序排列
  resList.sort((a, b) => {
    return b.count - a.count;
  });
  return resList[0];
}






3. 问题：完成一个字符串模板引擎的解析，将模板字符串中的${ } 解析成为对应的变量

const temp1 = 'hello, ${b}, ${d[0].e} word';
const temp2 = '你好，我们公司是{{company}}，我们属于{{group.name}}业务线，我们在招聘各种方向的人才，包括{{group.jobs[0]}}、{{group["jobs"][1]}}等。'
const obj = {
  group: {
    name: '天猫',
    jobs: ['前端']
  	sort: {
      xxx: 'yyy',
    }
  },
  company: '阿里'
}


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










