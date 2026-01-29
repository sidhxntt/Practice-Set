package main

import (
	"basics/modules"
	"fmt"
)

func defer_print() {
	fmt.Println("hello")
}
func stacking_defer() {
	// stacking defer statements LIFO order (go specific)
	defer fmt.Println("world") // pushes to stack first ie top = 0
	defer fmt.Println("from")  // pushes to stack second ie top = 1
	defer fmt.Println("defer") // pushes to stack third ie top = 2
	// when function ends, pops from stack and executes
}
func main() {
	defer defer_print()                     // defer statement ie the function will be executed at the end of main aka it defers its execution (go specific) , last called function, basically asynchronous
	stacking_defer()                        // 1st called function
	modules.BasicsPackagesVariablesFuncs()  // 2nd called function
	modules.FlowControl1()                  // 3rd called function
	modules.FlowControl2()                  // 4th called function
	modules.ArraysAndSlices()               // 5th called function
	modules.DynamicArrays()                 // 6th called function
	modules.MultiDimensionalSlices()        // 7th called function
	modules.Pointer()                       // 8th called function
	modules.Structs()                       // 9th called function
	modules.Maps()                          // 10th called function
	modules.FunctionsAsFirstClassCitizens() // 11th called function
}
