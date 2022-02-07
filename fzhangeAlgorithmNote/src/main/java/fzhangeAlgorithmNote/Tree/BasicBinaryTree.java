package fzhangeAlgorithmNote.Tree;

import fzhangeAlgorithmNote.common.TreeNode;

/**
 * 二叉树的递归解法可以分为两类思路，
 * 一类是遍历二叉树得出题解、对应的就是回溯算法的核心框架。
 * 一类是分解问题计算出答案，对应的就是动态规划核心思想。
 */

class MaxDepth {
    int res = 0;
    int depth = 0;

    //? 遍历二叉树获取树的最深高度的思路
    int maxDepthByTraverse(TreeNode root) {
        traverse(root);
        return res;
    }

    void traverse(TreeNode root) {
        if (root == null) {
            res = Math.max(res, depth);
            return;
        }
        depth++;
        traverse(root.left);
        traverse(root.right);
        depth--;
    }

    //? 分解问题获取最深高度
    int maxDepthByDynamaicProgramming(TreeNode root) {
        if (root == null)
            return 0;
        return 1 + Math.max(maxDepthByDynamaicProgramming(root.left), maxDepthByDynamaicProgramming(root.right));
    }
}

class BasicBinaryTree {
    // ? 124. 二叉树中的最大路径和
    // https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/
    // int MIN_VALUE_OF_INTEGER = Integer.MIN_VALUE;
    // public int maxPathSum(TreeNode root) {
    // if (root == null) return 0;
    // int left = Math.max(0, maxPathSum(root.left));
    // int right = Math.max(0, maxPathSum(root.right));
    // MIN_VALUE_OF_INTEGER = Math.max(MIN_VALUE_OF_INTEGER, left + right +
    // root.val);
    // return Math.max(left, right);
    // }
}