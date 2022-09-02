package fzhangeAlgorithmNote.BFS;

import fzhangeAlgorithmNote.common.TreeNode;
import java.util.LinkedList;
import java.util.Queue;

public class Bfs{
    public static void main(String[] args) {}

    /**
     * 111. 二叉树的最小深度 https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
     */
    public int minDepth(TreeNode root) {
        if(root == null) return 0;
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);
        int count = 1;
        while(queue.size() != 0){
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if(node.left == null && node.right ==null) return count;
                if(node.left != null) queue.offer(node.left);
                if(node.right != null) queue.offer(node.right);
            }
        }
        return count;
    }
}