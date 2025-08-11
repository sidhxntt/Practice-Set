package main

import (
	"fmt"
	"math/rand"
	"time"
)

// ===== Abstraction =====
// Game interface (only exposes what a game should do)
type Game interface {
	Start()
}

// ===== Encapsulation =====
type Player struct {
	name string
}

func NewPlayer(name string) Player {
	return Player{name: name}
}

func (p Player) GetName() string {
	return p.name
}

// ===== Composition =====
type GuessingGame struct {
	player       Player
	targetNumber int
	attempts     int
}

func NewGuessingGame(player Player) GuessingGame {
	rand.Seed(time.Now().UnixNano())
	return GuessingGame{
		player:       player,
		targetNumber: rand.Intn(100) + 1, // Random number 1–100
		attempts:     0,
	}
}

// ===== Polymorphism =====
// GuessingGame implements Game
func (g *GuessingGame) Start() {
	fmt.Printf("Welcome %s! I have picked a number between 1 and 100.\n", g.player.GetName())

	for {
		var guess int
		fmt.Print("Enter your guess: ")
		fmt.Scan(&guess)
		g.attempts++

		if guess < g.targetNumber {
			fmt.Println("Too low! Try again.")
		} else if guess > g.targetNumber {
			fmt.Println("Too high! Try again.")
		} else {
			fmt.Printf("🎉 Congratulations %s! You guessed it in %d attempts.\n", g.player.GetName(), g.attempts)
			break
		}
	}
}

// ===== Main =====
func main() {
	var name string
	fmt.Print("Enter your name: ")
	fmt.Scan(&name)

	player := NewPlayer(name)
	game := NewGuessingGame(player)

	var g Game = &game // Polymorphism
	g.Start()
}
