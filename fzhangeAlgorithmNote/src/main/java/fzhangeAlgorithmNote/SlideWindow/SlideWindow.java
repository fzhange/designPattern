package fzhangeAlgorithmNote.SlideWindow;

import java.util.HashMap;

/**
 * 滑动窗口类问题
 */

public class SlideWindow {
    // 76. 最小覆盖子串 https://leetcode-cn.com/problems/minimum-window-substring/
    public String minWindow(String s, String t) {
        HashMap<Character, Integer> needs = new HashMap<Character, Integer>();
        HashMap<Character, Integer> window = new HashMap<Character, Integer>();
        int left = 0, right = 0;
        int valid = 0;

        // 记录最小覆盖子串的起始索引及长度
        int start = 0, len = Integer.MAX_VALUE;

        for (int i = 0; i < t.length(); i++) {
            needs.put(t.charAt(i), 1);
        }

        while (right < s.length()) {
            // c 是将移入窗口的字符
            char c = s.charAt(right);
            // 右移窗口
            right++;
            // 进行窗口内数据的一系列更新
            if (needs.get(c) == 1) {
                if (window.get(c) != null) {
                    window.put(c, window.get(c) + 1);
                } else {
                    valid++;
                    window.put(c, 1);
                }
            }

            // 判断左侧窗口是否要收缩
            while (valid == needs.size()) {
                // 在这里更新最小覆盖子串
                if (right - left < len) {
                    len = right - left;
                    start = left;
                }
                // d 是将移出窗口的字符
                char d = s.charAt(left);
                if (needs.get(d) == 1) {
                    if (window.get(d) == needs.get(d)) {
                        valid--;
                    }
                    window.put(d, window.get(d) - 1);
                }
            }
        }
        return len == Integer.MAX_VALUE ? "" : s.substring(left,left + len);
    }
}