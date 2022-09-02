package fzhangeAlgorithmNote.basicAlgorithm;

import java.io.File;

public class Find {

    public int[] searchRange(int[] nums, int target) {
        int[] range = {
                findLeftBoundaryOfArray(nums, target),
                findRightBoundaryOfArray(nums, target)
        };
        return range;
    }

    public int findLeftBoundaryOfArray(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int middle = (left + right) / 2;
            if (nums[middle] == target)
                right = middle - 1;
            if (nums[middle] > target)
                right = middle - 1;
            if (nums[middle] < target)
                left = middle + 1;
        }
        try {
            return nums[right + 1] == target ? right + 1 : -1;
        } catch (Exception e) {
            return -1;
        }
    }

    public int findRightBoundaryOfArray(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int middle = (left + right) / 2;
            if (nums[middle] == target)
                left = middle + 1;
            if (nums[middle] > target)
                right = middle - 1;
            if (nums[middle] < target)
                left = middle + 1;
        }
        try {
            return nums[left - 1] == target ? left - 1 : -1;
        } catch (ArrayIndexOutOfBoundsException e) {
            return -1;
        }
    }

    public int findLeftBoundaryOfArray_0(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int middle = (left + right) / 2;
            if (nums[middle] == target)
                right = middle;
            if (nums[middle] > target)
                right = middle;
            if (nums[middle] < target)
                left = middle + 1;
        }
        try {
            return nums[right] == target ? right : -1;
        } catch (ArrayIndexOutOfBoundsException e) {
            return -1;
        }
    }

    public int findRightBoundaryOfArray_0(int[] nums, int target) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            int middle = (left + right) / 2;
            if (nums[middle] == target)
                left = middle + 1;
            if (nums[middle] > target)
                right = middle;
            if (nums[middle] < target)
                left = middle + 1;
        }
        try {
            return nums[left - 1] == target ? left - 1 : -1;
        } catch (ArrayIndexOutOfBoundsException e) {
            return -1;
        }
    }
}
