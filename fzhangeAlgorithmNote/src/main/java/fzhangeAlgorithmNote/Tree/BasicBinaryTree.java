package fzhangeAlgorithmNote.Tree;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import fzhangeAlgorithmNote.common.TreeNode;

/**
 * 二叉树的递归解法可以分为两类思路，
 * 一类是遍历二叉树得出题解、对应的就是回溯算法的核心框架。
 * 一类是分解问题计算出答案，对应的就是动态规划核心思想。
 */
/**
 * 前中后序是遍历二叉树过程中处理每一个节点的三个特殊时间点，绝不仅仅是三个顺序不同的 List：
 * 前序位置的代码在刚刚进入一个二叉树节点的时候执行；
 * 后序位置的代码在将要离开一个二叉树节点的时候执行；
 * 中序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行。
 */

class BasicBinaryTree {
    
    //? 是否可以通过遍历一遍二叉树得到答案？如果不能的话，是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？
    // 先序遍历
    List<TreeNode> preorderTraverse1(TreeNode root) {
        class Traverse{
            List<TreeNode> list = new LinkedList<TreeNode>();
            List<TreeNode> getList(TreeNode root){
                if(root == null) return list;
                list.add(root);
                getList(root.left);
                getList(root.right);
                return list;
            }
        }
        return new Traverse().getList(root);
    }

    List<TreeNode> preorderTraverse2(TreeNode root) {
        List<TreeNode> list = new ArrayList<TreeNode>();
        if(root == null) return list;
        list.add(root);
        if(root.left != null) list.addAll(preorderTraverse2(root.left));
        if(root.right != null) list.addAll(preorderTraverse2(root.right));
        return list;
    }

    // 后序位置进行数据处理
    // 543. 二叉树的直径 https://leetcode-cn.com/problems/diameter-of-binary-tree/
    public int diameterOfBinaryTree(TreeNode root) {
        class MaxDepth{
            int myDiameter = 0;
            public int getMaxDepth(TreeNode root) {
                if(root == null) return 0;
                int leftMaxDepth = getMaxDepth(root.left);
                int rightMaxDepth = getMaxDepth(root.right);
                myDiameter = Math.max(leftMaxDepth + rightMaxDepth, myDiameter);
                return Math.max(leftMaxDepth, rightMaxDepth) + 1;
            }
            public int getMyDiameter(){
                return this.myDiameter;
            }
        }
        MaxDepth ins = new MaxDepth();
        ins.getMaxDepth(root);
        return ins.getMyDiameter();
    }
}