package main

import "fmt"

type MinStack struct {
	dataStack []int
	minStack  []int
}

type List struct {
	Val  int
	Next *List
}

func main() {
	for i := 0; i < 10; i++ {
		fmt.Println("i", i)
		for j := 0; j < 10; j++ {
			fmt.Println("j", j)
			if j == 2 {
				break
			}
		}
	}
}

type MyStack struct {
	queue1 []int
	queue2 []int
}

func Constructor() MyStack {
	return MyStack{}
}

func (this *MyStack) Push(x int) {
	this.queue1 = append([]int{x}, this.queue2...)
	this.queue2 = this.queue1
	this.queue1 = []int{}
}

func (this *MyStack) Pop() int {
	if len(this.queue2) == 0 {
		return 0
	}
	var val int
	if len(this.queue2) == 1 {
		val = this.queue2[0]
		this.queue2 = []int{}
	} else {
		val = this.queue2[0]
		this.queue2 = this.queue2[1:]
	}
	return val
}

func (this *MyStack) Top() int {
	if len(this.queue2) == 0 {
		return 0
	}
	return this.queue2[0]
}

func (this *MyStack) Empty() bool {
	return len(this.queue2) == 0
}

/**
 * Your MyStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(x);
 * param_2 := obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.Empty();
 */
