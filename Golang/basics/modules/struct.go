package modules

import "fmt"

type Person struct {
	Name string
	Age  int
}

func Structs() {
	// Create a new Person struct
	p := Person{Name: "Alice", Age: 30}
	fmt.Println(p)

	// Access and modify struct fields
	p.Age += 1
	fmt.Println(p.Name, "is now", p.Age, "years old")

	n := &p
	n.Name = "Bob"
	fmt.Println(p.Name, "is now", p.Age, "years old")

}

func Maps() {
	// Create a map
	m := make(map[string]int)

	// Set key-value pairs
	m["Alice"] = 30
	m["Bob"] = 25

	// Access values
	fmt.Println("Alice's age:", m["Alice"])

	// Delete a key
	delete(m, "Bob")

	// Iterate over the map
	for k, v := range m {
		fmt.Printf("%s is %d years old\n", k, v)
	}
}
