/**
 * 1、倒序打印一条单链表上所有节点的值
 * 
 * 2、举具体的例子，现在给你一棵二叉树，我问你两个简单的问题：
 * 2.1、如果把根节点看做第 1 层，如何打印出每一个节点所在的层数？
 * 2.2、如何打印出每个节点的左右子树各有多少节点？
 */


// // 定义：输入一棵二叉树，返回这棵二叉树的节点总数
// int count(TreeNode root) {
//     if (root == null) {
//         return 0;
//     }
//     int leftCount = count(root.left);
//     int rightCount = count(root.right);
//     // 后序位置
//     printf("节点 %s 的左子树有 %d 个节点，右子树有 %d 个节点",
//             root, leftCount, rightCount);

//     return leftCount + rightCount + 1;
// }