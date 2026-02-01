package modules

import (
	"fmt"
	"runtime"
)

// Exported function
func FlowControl1() {
	even_sum := 0
	odd_sum := 0
	for i := 0; i < 10; i++ {
		if i%2 == 0 {
			even_sum += i
		} else {
			odd_sum += i
		}
	}
	fmt.Println(even_sum, odd_sum)
}

func flowControl2() string {
	switch os := runtime.GOOS; os {
	case "darwin":
		return "macOS"
	case "linux":
		return "Linux"
	default:
		return os
	}
}

// Exported function
func FlowControl2() {
	fmt.Printf("Operating System: %s\n", flowControl2())
}
