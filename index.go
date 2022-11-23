package main

import (
	"fmt"
	"strconv"
)

type MinStack struct {
	dataStack []int
	minStack  []int
}

type List struct {
	Val  int
	Next *List
}

func main() {
	var x int = 10
	var y int = 3
	fmt.Println(x / y)
}

func evalRPN(tokens []string) int {
	var caclucateMap = map[string]string{
		"+": "+",
		"-": "-",
		"*": "*",
		"/": "/",
	}
	var stacks = []string{}
	for i, v := range tokens {
		if _, ok := caclucateMap[v]; ok {
			// stacks = append(stacks, )
			right, _ := strconv.Atoi(stacks[len(stacks)-1])
			left, _ := strconv.Atoi(stacks[len(stacks)-2])
			stacks = stacks[:len(stacks)-2]
			var total int
			switch v {
			case "+":
				total = left + right
				break
			case "-":
				total = left - right
				break
			case "*":
				total = left * right
				break
			case "/":
				total = left / right
				break
			}
			if i == len(tokens)-1 {
				return total
			} else {
				stacks = append(stacks, strconv.Itoa(total))
			}
		} else {
			stacks = append(stacks, v)
		}
	}
	var total int
	for _, v := range stacks {
		val, _ := strconv.Atoi(v)
		total += val
	}
	return total
}
