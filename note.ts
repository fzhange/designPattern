/**
 * 动态规划
 * 状态 | 选择
 * 状态压缩 状态机
 * https://labuladong.gitee.io/algo/1/13/
 */

import { type } from "os";

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

// let arr: number = [1, 2, 3, 4, 5]
// let idx = arr.findIndex((item) => item === 6)
// console.log('idx: ', idx);


type x = number;
type z = {
  name: string
}
interface y {
  name: string;
}