/**
 * 动态规划
 * 状态 | 选择
 * 状态压缩 状态机
 * https://labuladong.gitee.io/algo/1/13/
 */

/**
 * 标志法
 * 指针 | 前后指针【二分查找】 | 快慢指针 【快慢指针创建滑动窗口、环形链表、】
 * hash memory
 *
 *
 * 回溯 backTrace
 * 选择路径  可选择状态
 *
 */

/**
 *? 对于数组
 * 我们一般思考
 * 1、是不是有序？  将数组有序化是不是可以解决我们的问题
 * 2、是不是去重的  去重的数组 我们是不是可以使用hash做一些 空间换时间的操作
 */

// MyPromise.allSettled = function (promises) {
//   return new MyPromise((resolve, reject) => {
//     promises = Array.isArray(promises) ? promises : [];
//     let len = promises.length;
//     const argslen = len;
//     // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
//     if (len === 0) return resolve([]);
//     // 将传入的参数转化为数组，赋给args变量
//     let args = Array.prototype.slice.call(promises);
//     // 计算当前是否所有的 promise 执行完成，执行完毕则resolve
//     const compute = () => {
//       if (--len === 0) {
//         resolve(args);
//       }
//     };
//     function resolvePromise(index, value) {
//       // 判断传入的是否是 promise 类型
//       if (value instanceof MyPromise) {
//         const then = value.then;
//         then.call(
//           value,
//           function (val) {
//             args[index] = { status: 'fulfilled', value: val };
//             compute();
//           },
//           function (e) {
//             args[index] = { status: 'rejected', reason: e };
//             compute();
//           },
//         );
//       } else {
//         args[index] = { status: 'fulfilled', value: value };
//         compute();
//       }
//     }

//     for (let i = 0; i < argslen; i++) {
//       resolvePromise(i, args[i]);
//     }
//   });
// };

process.nextTick(() => {
  console.log('nextTick 1');

  process.nextTick(() => {
    console.log('nextTick 2');

    process.nextTick(() => console.log('nextTick 3'));
    process.nextTick(() => console.log('nextTick 4'));
  });

  process.nextTick(() => {
    console.log('nextTick 5');

    process.nextTick(() => console.log('nextTick 6'));
    process.nextTick(() => console.log('nextTick 7'));
  });
});
