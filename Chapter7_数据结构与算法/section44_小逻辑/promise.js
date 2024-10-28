/**
 * 实现 mergePromise 函数，把传进去的函数数组按顺序先后执行，
 * 并且把返回的数据先后放到数组 data 中。
 */

const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log('1');
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log('2');
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log('3');
    return 3;
  });

// const mergePromise = (ajaxArray) => {
//   // 在这里实现你的代码
//   const res = [];

//   for (let index = 0; index < ajaxArray.length; index++) {
//     const ajax = ajaxArray[index];
//     res[index] = ajax();
//   }
//   return Promise.all(res);
// };

const mergePromise = (ajaxArray) => {
  // Deal the promise like a chain
  let sequence = Promise.resolve();
  return new Promise((resolve) => {
    const result = [];

    for (let index = 0; index < ajaxArray.length; index++) {
      sequence = sequence.then(ajaxArray[index]).then((res) => {
        result.push(res);
        if (index === ajaxArray.length - 1) resolve(result);
      });
    }
  });
};

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

/***
 * 利用 Promise 完成一个队列，队列中的任务数满了的话，后续任务不执行，
 * 当队列中的任务有完成的状态，才会添加新的任务进入队列
 */
class Scheduler {
  constructor(maxConcurrentCount) {
    this.currentCountOfExecutingTask = 0;
    this.eventQueue = [];
    this.maxConcurrentCount = maxConcurrentCount;
  }
  add(task) {
    return new Promise((resolve) => {
      this.eventQueue.push(() => {
        resolve(
          Promise.resolve(task()).then((res) => {
            this.currentCountOfExecutingTask--;
            this.start();
            return res;
          }),
        );
      });
      this.start();
    });
  }
  start() {
    if (this.currentCountOfExecutingTask <= this.maxConcurrentCount) {
      if (!this.eventQueue.length) return;
      const task = this.eventQueue.shift();
      this.currentCountOfExecutingTask++;
      task();
    } else {
      console.info(
        "The task will be executed later. cuz we don't have enough thread to do task now.",
      );
    }
  }
}

let scheduler = new Scheduler(5);
let mockTimeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

let addTask = function addTask(time, order) {
  scheduler
    .add(() => mockTimeout(time))
    .then((res) => {
      console.log(time, order, res);
    });
};

addTask(5000, '1');
addTask(1100, '2');
addTask(2200, '3');
addTask(3300, '4');
addTask(3300, '5');
addTask(3300, '6');
addTask(3300, '7');
addTask(2200, '8');
