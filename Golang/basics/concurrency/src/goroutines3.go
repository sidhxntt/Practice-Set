package src

import (
	"fmt"
	"sync"
)

var wg2 sync.WaitGroup // pointer, wait group to wait for goroutines to finish to solve the issue of main exiting before goroutines complete
var mutex sync.Mutex   // mutex to protect shared resources if needed

func ExampleGoroutines3() {

	wg2.Add(1) // add one goroutine to the wait group
	go greeter3("Sid", &wg2)

	wg2.Add(1) // add another goroutine to the wait group
	go greeter3("Pri", &wg2)

	wg2.Wait() // wait for both goroutines to finish
}

func greeter3(name string, wg *sync.WaitGroup) {

	if wg != nil {
		defer wg.Done() // mark the goroutine as done when it completes if wait group is provided
	}

	for i := 0; i < 5; i++ {
		mutex.Lock() // lock to ensure only one goroutine prints at a time
		fmt.Println("Hello,", name+"!")
		mutex.Unlock() // unlock after printing
	}
}

// mutex not required here as there are no shared resources being modified concurrently. only use when you have shared data that multiple goroutines might access or modify at the same time. for example, if both goroutines were incrementing a shared counter variable, you would use a mutex to protect access to that variable.

// In this example, we use sync.WaitGroup to ensure that the main function waits for the goroutine to finish before exiting. This prevents the program from terminating prematurely, allowing all greetings to be printed.

// Differnece between waitgroup and mutex?
// A WaitGroup is used to wait for a collection of goroutines to finish executing. It allows the main program to block until all specified goroutines have completed their tasks. On the other hand, a Mutex (mutual exclusion) is used to protect shared resources from concurrent access by multiple goroutines, ensuring that only one goroutine can access the resource at a time. In summary, WaitGroups are for synchronization of goroutine completion, while Mutexes are for protecting shared data from concurrent access.
