package src

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup // wait group to wait for goroutines to finish to solve the issue of main exiting before goroutines complete

func ExampleGoroutines2() {

	wg.Add(2) // add 2 goroutine to the wait group
	go greeter2("Sid", &wg)
	go greeter2("Pri", &wg)

	wg.Wait() // wait for both goroutines to finish
}

func greeter2(name string, wg *sync.WaitGroup) {
	if wg != nil {
		defer wg.Done() // mark the goroutine as done when it completes if wait group is provided
	}

	for i := 0; i < 5; i++ {
		fmt.Println("Hello,", name+"!")
	}
}

// In this example, we use sync.WaitGroup to ensure that the main function waits for the goroutine to finish before exiting. This prevents the program from terminating prematurely, allowing all greetings to be printed.

// Why add() and done()?
// The Add method is used to set the number of goroutines to wait for. Each time a goroutine is started, we call Add(1) to increment the counter. The Done method is called when a goroutine completes its work, decrementing the counter. When the counter reaches zero, the Wait method unblocks, allowing the main function to proceed. This mechanism ensures proper synchronization between the main function and the goroutines.
