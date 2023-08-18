func search(nums []int, target int) int {
	if len(nums) == 0 {
		return -1
	}
	if len(nums) == 1 {
		if nums[0] == target {
			return 0
		} else {
			return -1
		}
	}

	l := 0
	r := len(nums) - 1
	for {
		if l <= r && r >= 0 && l >= 0 {
			mid := (l + r) / 2
			if nums[mid] == target {
				return mid
			}

			// 证明左边是有序的
			if nums[0] <= nums[mid] {
				if nums[0] <= target && target < nums[mid] {
					r = mid - 1
				} else {
					l = mid + 1
				}
			} else {
				// 右边是有序的
				if nums[mid] < target && target <= nums[len(nums)-1] {
					l = mid + 1
				} else {
					r = mid - 1
				}
			}
		} else {
			break
		}
	}
	return -1
}