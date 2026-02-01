package modules

import "fmt"

// Define an interface
type Shape interface {
	Area() float64
}

// Define a struct that implements the interface
type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return 3.14 * c.Radius * c.Radius
}

// Define another struct that implements the interface
type Rectangle struct {
	Width, Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

func Interfaces() {
	// Use the interface
	var s Shape

	s = Circle{Radius: 5}
	fmt.Println("Circle Area:", s.Area())

	s = Rectangle{Width: 4, Height: 6}
	fmt.Println("Rectangle Area:", s.Area())
}

// Interfaces in Go provide a way to specify the behavior of an object. If something can do "this", then it can be used here.
// This allows for polymorphism and decouples the code from specific implementations.
// In this example, both Circle and Rectangle implement the Shape interface by providing their own Area method. Therefore if struct have Area method they are implicitly implementing Shape interface.

// if we havent used interface here we would have to write separate functions to calculate area for each shape type, leading to code duplication and less flexibility.
// By using interfaces, we can write more generic and reusable code that can work with any shape that implements the Area method.
