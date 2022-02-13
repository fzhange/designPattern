package fzhangeAlgorithmNote.DynamicProgramming;

import java.util.ArrayList;
import java.util.Arrays;

import javax.print.DocPrintJob;

import fzhangeAlgorithmNote.common.TreeNode;

/**
 * 动态规划的一般形式就是求最值。
 * 求解动态规划的核心问题是穷举。因为要求最值，肯定要把所有可行的答案穷举出来，然后在其中找最值呗。穷举的时候会存在效率低下的问题，所以需要[备忘录][dp table]做优化处理。
 */

/**
 * 斐波那契
 * 0 1 1 2 3 5 8 13
 */

// ? 递归算法的时间复杂度怎么计算？就是用子问题个数乘以解决一个子问题需要的时间。

public class DynamicProgramming {
    public static void main(String[] args) {
    }

    // !-----------------------------------------------------------------------------
    // 带备忘录式递归解法【自顶而下】
    int fibByRecursion(int N) { // 子问题个数N、每个子问题都不存在循环所以单个子问题的时间复杂度为O(1).所以整体为O(N)
        int[] memory = new int[N + 1]; // 备忘录
        return fibByRecursionHelper(memory, N);
    }

    int fibByRecursionHelper(int[] memory, int N) {
        if (N == 0 || N == 1)
            return N;
        if (memory[N] != 0)
            return memory[N];
        memory[N] = fibByRecursionHelper(memory, N - 1) + fibByRecursionHelper(memory, N - 2);
        return memory[N];
    }

    // 迭代动态规划解法【自底向上】【dp table】
    int fibByDynamicProgramming(int N) { // O(n) 时间复杂度
        ArrayList<Integer> arr = new ArrayList<Integer>();
        arr.add(0);
        arr.add(1);
        for (int i = 2; i <= N; i++) {
            arr.add(i, arr.get(i - 1) + arr.get(i - 2));
        }
        return arr.get(N);
    }

    // 迭代动态规划解法【自底向上】【dp table】【状态压缩】
    /**
     * ? 此例中 把DP table 的大小从 n 缩小到 2 空间复杂度从O(n) -> O(1)
     * 一般来说是把一个二维的 DP table 压缩成一维，即把空间复杂度从 O(n^2) 压缩到 O(n)。
     * 斐波那契数列的例子严格来说不算动态规划，因为没有涉及求最值，以上旨在说明【重叠子问题】的消除方法，演示得到最优解法逐步求精的过程。
     */
    int fibByDynamicProgrammingStatusCompress(int N) {
        int pre = 0;
        int curr = 1;
        if (N == 0)
            return pre;
        if (N == 1)
            return curr;
        for (int i = 2; i <= N; i++) {
            int sum = pre + curr;
            pre = curr;
            curr = sum;
        }
        return curr;
    }

    // !-----------------------------------------------------------------------------
    // 322. 零钱兑换 https://leetcode-cn.com/problems/coin-change/
    // 带备忘录式递归解法【自顶而下】 时间复杂度On 空间复杂度On
    public int coinChangeByCache(int[] coins, int amount) {
        int[] memory = new int[amount + 1];
        Arrays.fill(memory, -666);
        memory[0] = 0;
        return coinChangeByCacheHelper(coins, amount, memory);
    }

    public int coinChangeByCacheHelper(int[] coins, int amount, int[] memory) {
        if (amount < 0)
            return -1;
        if (amount == 0)
            return 0;
        if (memory[amount] != -666)
            return memory[amount];

        int res = Integer.MAX_VALUE;
        for (int i = 0; i < coins.length; i++) {
            int subProblem = coinChangeByCacheHelper(coins, amount - coins[i], memory);
            if (subProblem == -1)
                continue;
            res = Math.min(res, subProblem + 1);
        }
        memory[amount] = res == Integer.MAX_VALUE ? -1 : res;
        return memory[amount];
    }

    public int coinChangeByDynamicProgramming(int[] coins, int amount){
        int[] dp = new int[amount + 1];
        // 数组大小为 amount + 1，初始值也为 amount + 1
        Arrays.fill(dp, amount + 1);

        // base case
        dp[0] = 0;
        // 外层 for 循环在遍历所有状态的所有取值
        for (int i = 0; i < dp.length; i++) {
            // 内层 for 循环在求所有选择的最小值
            for (int coin : coins) {
                // 子问题无解，跳过
                if (i - coin < 0) {
                    continue;
                }
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
        return (dp[amount] == amount + 1) ? -1 : dp[amount];
    }

    // !-----------------------------------------------------------------------------
    // 104. 二叉树的最大深度 https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
