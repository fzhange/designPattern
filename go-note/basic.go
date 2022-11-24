package main

import "fmt"

func main() {
	// ~ 数据相除
	var x int = 10
	var y int = 3
	fmt.Println(x / y) //3

	//~ map iteration
	mp := map[string]string{
		"name": "f",
		"sex":  "male",
	}

	for key, val := range mp {
		fmt.Println(key, val)
	}

	// ~ list iteration
	names := []string{"zf", "zy"}
	for idx, name := range names {
		fmt.Println(idx, name)
	}
}
