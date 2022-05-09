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

    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */
