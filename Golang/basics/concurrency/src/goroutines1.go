package src

import "fmt"

func ExampleGoroutines1() {
	// This is a placeholder for the actual implementation of goroutines example.
	go greeter("Sid") // only pri will run as sid is in a goroutine and main thread ends before it can execute, it doesnt wait for goroutine to finish
	greeter("Pri")
}

func greeter(name string) {
	for i := 0; i < 5; i++ {
		fmt.Println("Hello, " + name + "!")
	}
}

// Difference between a goroutine and a normal function is that a goroutine runs concurrently with other goroutines and functions.
// When you prefix a function call with the 'go' keyword, it becomes a goroutine.
// This means that the function will execute independently and concurrently with the rest of your program.
// goroutine vs threads
// Goroutines are lightweight, managed by the Go runtime, and have a smaller memory footprint compared to traditional threads.
// This allows you to create thousands or even millions of goroutines in a single application without significant overhead.
// Threads are managed by the operating system and typically consume more resources, making them less suitable for high-concurrency scenarios.
// Goroutines communicate using channels, which provide a safe way to share data between them without explicit locking.
// Threads often require complex synchronization mechanisms (like mutexes) to avoid race conditions.
// Goroutines are multiplexed onto a smaller number of OS threads by the Go runtime, allowing efficient use of system resources. It follows a model called M:N scheduling (M goroutines on N OS threads).
// Threads are usually one-to-one mapped to OS threads, which can lead to higher resource consumption.
// In summary, goroutines are a more efficient and easier-to-use concurrency primitive in Go compared to traditional threads, making them ideal for building scalable and concurrent applications.
//  When M goroutines are created, the Go runtime schedules them to run on N operating system threads. This means that multiple goroutines can share a single OS thread, allowing for efficient use of system resources.
//  and as it is M goroutines communication is faster than N threads as switching between threads is costlier than switching between goroutines
