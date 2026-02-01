package main

import (
	"concurrency/src"
	// "fmt"
)

func main() {
	// src.ExampleGoroutines1()
	// fmt.Println("This wll print before goroutines1 complete to show that main does not wait for goroutines to finish")
	// src.ExampleGoroutines2()
	// src.ExampleGoroutines3()
	// src.RaceCondition()
	src.ChannelsExample()
}
