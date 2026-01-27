package main

import (
	"fmt"
	"math"
	"math/rand"
)

const Pi = 3.14 // constant declaration
// Pi += 1          // error: cannot assign to Pi (constant)

func add(x int, y int) int {
	return x + y
} // When two or more consecutive named function parameters share a type, you can omit the type from all but the last. (x, y int)

func swap(x, y string) (string, string) {
	return y, x
}

func intialisation() {
	// auto initialisation to zero values (go lang specific)
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s)
}

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))

	var x, y int = 3, 4 // variable declaration 	x, y := 3, 4     // type inference ie direct assignment

	fmt.Println("3 + 4 =", add(x, y))

	a, b := swap("hello", "world") // direct assignment (destructuring happening here)
	fmt.Println(a, b)

	intialisation()
}
