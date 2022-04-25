/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode() {}
 * TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
class Solution {
  public int getBoundaryOfLeft(int[] list, int target) {
    int left = 0;
    int right = list.length - 1;
    while (left <= right) {
      int mid = (int) Math.floor((left + right) / 2);
      if (list[mid] == target) {
        right = mid - 1;
      }
      if (list[mid] > target) {
        right = mid - 1;
      }
      if (list[mid] < target) {
        left = mid + 1;
      }
    }
    try {
      if (list[right + 1] == target) {
        return right + 1;
      }
    } catch (Exception e) {
      return -1;
    }
    return -1;
  }

  public static void main(String[] args) {
    int[] list = { 6, 7, 8, 9, 10, 11 };
    int x = new Solution().getBoundaryOfLeft(list, 5);
    System.out.println(x);
  }
}
