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
