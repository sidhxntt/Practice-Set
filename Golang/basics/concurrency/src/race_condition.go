package src

import (
	"fmt"
	"sync"
)

func RaceCondition() {
	var wg sync.WaitGroup
	// var mutex sync.Mutex

	// Shared pointer
	counter := 0
	ptr := &counter

	wg.Add(3)

	go increment("A", ptr, &wg)
	go increment("B", ptr, &wg)
	go increment("C", ptr, &wg)

	wg.Wait()
	fmt.Println("Final value:", *ptr)
}

func increment(id string, ptr *int, wg *sync.WaitGroup) {
	defer wg.Done()

	for i := 0; i < 1000; i++ {
		// mutex.Lock()   // Lock the mutex before accessing the shared resource
		*ptr = *ptr + 1 // ❌ DATA RACE // Multiple goroutines interleave these steps.
		// mutex.Unlock() // Unlock the mutex after updating the shared resource
	}
}

// In this example, we have three goroutines incrementing the same shared pointer concurrently without any locking mechanism. This can lead to a data race, where the final value is unpredictable due to concurrent access and modification of the shared variable.
// Output value is non-deterministic. Expected: 3000. Actual: could be 2874, 2999, 2412, etc.
// to catch go run -race main.go
// To fix this issue, we would typically use synchronization mechanisms like mutexes to ensure that only one goroutine can modify the shared resource at a time.
