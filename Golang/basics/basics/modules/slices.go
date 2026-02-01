package modules

import "fmt"

func ArraysAndSlices() {
	// Arrays
	a := [3]int{1, 2, 3}
	fmt.Println("Array:", a)

	// modifying array elements
	s := []int{1, 2, 3}
	s = append(s, 4)
	fmt.Println("Slice:", s)

	// Slicing
	sub := s[1:3]
	fmt.Println("Sub-slice:", sub)

	for i, v := range s {
		fmt.Printf("Index %d: Value %d\n", i, v)
	}

	length := len(s)
	capacity := cap(s)
	fmt.Println("Length:", length, "Capacity:", capacity)
}

func DynamicArrays() {
	// Create a slice with make
	s := make([]int, 5) // length 5 intialized to zeros, memory efficient
	fmt.Println("Slice with make:", s)

	// Append elements to the slice
	s = append(s, 6, 7, 8) // dynamically increases size
	fmt.Println("After appending:", s)

	// Iterate over the slice
	for i, v := range s {
		fmt.Printf("Index %d: Value %d\n", i, v)
	}
}

func MultiDimensionalSlices() {
	matrix := make([][]int, 3)
	for i := range matrix {
		matrix[i] = make([]int, 4)
	}
	fmt.Println("2D Slice:", matrix)
}
