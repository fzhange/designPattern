package main

import "fmt"

func main() {
	val := twoSum([]int{
		3, 3,
	}, 6)
	fmt.Println(">>", val)
}

func twoSum(nums []int, target int) []int {
	numsMap := make(map[int]int)

	for i := 0; i < len(nums); i++ {
		numsMap[nums[i]] = i
	}
	fmt.Println("||>", numsMap)

	for i := 0; i < len(nums); i++ {
		restVal := target - nums[i]
		anotherIdx, ok := numsMap[restVal]
		if ok && anotherIdx != i {
			return []int{i, anotherIdx}
		}
	}

	return []int{}
}
