/**
 * 动态规划
 * 状态 | 选择
 * 状态压缩 状态机
 * https://labuladong.gitee.io/algo/1/13/
 */

import { type } from 'os';

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

// TODO
// 543. 二叉树的直径  https://leetcode.cn/problems/diameter-of-binary-tree/submissions/
// 409. 最长回文串   https://leetcode.cn/problems/longest-palindrome/  这个太牛了
//

// 如何打印出每个节点的左右子树各有多少节点？
// function countOfNode(tree) {
//   if (!tree) return 0;
//   const leftNodeCount = countOfNode(tree.left);
//   const rightNodeCount = countOfNode(tree.right);

//   console.log(`当前节点名：${tree.name}; 左节点数量 ${leftNodeCount}; 右节点数量 ${rightNodeCount}`);

//   return leftNodeCount + rightNodeCount + 1;
// }
// console.log('countOfNode(tree): ', countOfNode(tree));

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
