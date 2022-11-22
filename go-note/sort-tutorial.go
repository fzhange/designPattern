package sortTutorial

import (
	"fmt"
	"sort"
)

// ~  ----------------------------------------------------------------
func init() {
	// ~ int
	intValue := []int{10, 20, 5, 8}
	sort.Ints(intValue)
	fmt.Println("Ints:   ", intValue) //Ints:    [5 8 10 20]

	// ~ float
	floatValue := []float64{10.5, 20.5, 5.5, 8.5}
	sort.Float64s(floatValue)
	fmt.Println("floatValue:   ", floatValue) //floatValue:    [5.5 8.5 10.5 20.5]

	// ~ string
	stringValue := []string{"Raj", "Mohan", "Roy"}
	sort.Strings(stringValue)
	fmt.Println("Strings:", stringValue) //Strings: [Mohan Raj Roy]

	// ~ haveSorted
	str := sort.Float64sAreSorted(floatValue) //Sorted:  true
	fmt.Println("Sorted: ", str)

}

// ~  ----------------------------------------------------------------
//~ custom sort function
type OrderByLengthDesc []string

func (s OrderByLengthDesc) Len() int {
	return len(s)
}
func (str OrderByLengthDesc) Swap(i, j int) {
	str[i], str[j] = str[j], str[i]
}
func (s OrderByLengthDesc) Less(i, j int) bool {
	return len(s[i]) > len(s[j])
}
func customSortDemo() {
	city := []string{"New York", "London", "Washington", "Delhi"}
	sort.Sort(OrderByLengthDesc(city))
	fmt.Println(city)
}

// ~  ----------------------------------------------------------------
func test() {
	family := []struct {
		Name string
		Age  int
	}{
		{"Alice", 23},
		{"David", 2},
		{"Eve", 2},
		{"Bob", 25},
	}

	// 变异方法
	sort.SliceStable(family, func(i, j int) bool {
		if family[i].Age < family[j].Age {
			return true
		} else {
			return false
		}
	})
	fmt.Println("--family", family) // [{David 2} {Eve 2} {Alice 23} {Bob 25}]
}
