package src

import (
	"fmt"
	"sync"
)

func ChannelsExample() {
	fmt.Println("This is a placeholder example")

	mychan := make(chan int, 2) // Buffered channel with capacity 2
	wg := &sync.WaitGroup{}

	wg.Add(2)

	go func(ch chan<- int, wg *sync.WaitGroup) { // send only channel
		// close(mychan) // Closing channel here would cause panic in receiver if it tries to read after close
		ch <- 42 // Sending value to channel
		ch <- 24 // Sending value to channel
		fmt.Println("Sent: 42")
		fmt.Println("Sent: 24")
		defer wg.Done()
	}(mychan, wg) // Sender (IIFE)

	go func(ch <-chan int, wg *sync.WaitGroup) { // receive only channel
		defer wg.Done()
		val, open := <-mychan // Receiving value from channel
		if open {
			fmt.Println("Received:", val, "status:", open)
			fmt.Println("Received:", val, "status:", open)
		} else {
			fmt.Println("Channel closed!")
		}

	}(mychan, wg) // Receiver (IIFE)

	wg.Wait()
}

// In this example, we create a channel of integers and use two goroutines: one to send a value to the channel and another to receive that value. The WaitGroup ensures that the main function waits for both goroutines to complete before exiting. This demonstrates basic channel operations in Go for inter-goroutine communication.

// The receiver must receive the value before the send completes,
// but the order of the print statements may vary.
// Output could be:
// Sent: 42
// Received: 42
// or
// Received: 42
// Sent: 42
// The output varies because of how Go schedules goroutines and what channels do—and do not—guarantee.
