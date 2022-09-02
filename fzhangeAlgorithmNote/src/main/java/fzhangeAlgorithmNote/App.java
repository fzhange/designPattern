package fzhangeAlgorithmNote;

import java.util.Random;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        int[] x = {1, 2, 3};
        System.out.println("Hello World!" + Math.random() * 11);
    }
}


class Solution {
    int[] w;
    int[] prefixSum;

    public Solution(int[] w) {
        this.w = w;
        this.prefixSum = new int[w.length + 1];
        for (int i = 1; i < w.length; i++) {
            this.prefixSum[i] = w[i - 1] + this.prefixSum[i - 1];
        }
    }

    public int pickIndex() {
        double random = Math.random() * 11;
        for (int i = 1; i < this.prefixSum.length; i++) {
            if (random <= this.prefixSum[i]) {
                return i - 1;
            }
        }
        return 0;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */
