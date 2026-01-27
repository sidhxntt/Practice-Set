package modules

import (
	"fmt"
	"math"
	"math/rand"
)

const Pi = 3.14 // constant declaration
// Pi += 1      // This will cause a compile-time error

func add(x, y int) int {
	return x + y
}

func swap(x, y string) (string, string) {
	return y, x
}

func intialisation() { // auto zero value initialisation (go specific)
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s)
}

// Exported function
func BasicsPackagesVariablesFuncs() {
	fmt.Println("My favorite number is", rand.Intn(10))
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))

	x, y := 3, 4
	fmt.Println("3 + 4 =", add(x, y))

	a, b := swap("hello", "world")
	fmt.Println(a, b)

	intialisation()
}
