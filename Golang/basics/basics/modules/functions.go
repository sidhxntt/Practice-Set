package modules

import "fmt"

func FunctionsAsFirstClassCitizens() { // Define a function that takes another function as an argument
	// Define a function that takes another function as an argument
	apply := func(f func(int) int, x int) int {
		return f(x)
	}

	// Define a function to be passed
	square := func(x int) int {
		return x * x
	}

	// Use the apply function
	result := apply(square, 5)
	fmt.Println("Square of 5 is:", result)

	// Define a function that returns another function
	makeAdder := func(y int) func(int) int {
		return func(x int) int {
			return x + y
		}
	}

	addFive := makeAdder(5)
	fmt.Println("5 + 10 =", addFive(10))
}

func proadder(vals ...int) int { // infinite parameters
	sum := 0
	for _, v := range vals {
		sum += v
	}
	return sum
}

func (p Person) ExampleMethodReceiver() { // method receiver ie basically a function associated with a struct
	fmt.Println("Person's Name is:", p.Name)
}

// golang doest not support classes but we can achieve similar functionality using structs and methods. meaning this function is associated with struct Person defined in struct.go
