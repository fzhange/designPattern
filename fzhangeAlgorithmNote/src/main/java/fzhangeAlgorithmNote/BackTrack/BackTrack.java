package fzhangeAlgorithmNote.BackTrack;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import fzhangeAlgorithmNote.basicAlgorithm.Sort;


class TreeNode{
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val){
        this.val = val;
    }
    TreeNode(int val,TreeNode left,TreeNode right){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * 回溯本质上就是DFS，暴力美学。
 * 解决一个回溯问题，实际上就是一个决策树的遍历过程。需要思考 3 个问题：
 * 1、路径：也就是已经做出的选择。
 * 2、选择列表：也就是你当前可以做的选择。
 * 3、结束条件：也就是到达决策树底层，无法再做选择的条件。
 */
public class BackTrack {

    // !-----------------------------------------------------------------------------
    // 46. 全排列 https://leetcode-cn.com/problems/permutations/
    // public List<List<Integer>> permute(int[] nums) {
    //     backTrack(nums,new LinkedList<Integer>());
    //     return res;
    // }
    // public void backTrack(int[] selectList, LinkedList<Integer> track){
    //     if(track.size() == selectList.length){
    //         res.add(track);
    //         return;
    //     }
    //     for (int i = 0; i < selectList.length; i++) {
    //         if(track.contains(selectList[i])) continue;
    //         track.add(selectList[i]);
    //         backTrack(selectList, track);
    //         track.removeLast();
    //     }
    // }

    // !-----------------------------------------------------------------------------
    // 111. 二叉树的最小深度 https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
    public int minDepth(TreeNode root) {
        if(root == null) return 0;
        ArrayList<Integer> list = new ArrayList<Integer>();
        minDepthHelper(1,root,list);
        list = Sort.quickSort(list);
        return list.get(0);
    }
    void minDepthHelper(int depth,TreeNode root,ArrayList list){
        if(root.left == null && root.right == null) {
            list.add(depth);
            return;
        }
        if(root.left != null) minDepthHelper(depth+1, root.left,list);
        if(root.right != null) minDepthHelper(depth+1, root.right,list);
    }
}