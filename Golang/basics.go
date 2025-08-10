package main

import (
	"fmt"
	"strings"
)

func getFirstNames(bookings []string) []string {
	firstNames := make([]string, 0, len(bookings))
	for _, booking := range bookings {
		nameParts := strings.Fields(booking)
		if len(nameParts) > 0 {
			firstNames = append(firstNames, nameParts[0])
		}
	}
	return firstNames
}

func main() {
	conferenceName := "Go Conference"
	const conferenceTickets uint = 50
	var remainingTickets uint = conferenceTickets
	var firstName, lastName string
	var userTicket uint
	var bookings []string // slice to store full names

	fmt.Printf("conferenceTickets is %T, remainingTickets is %T & conferenceName is %T\n", conferenceTickets, remainingTickets, conferenceName)
	fmt.Println("Welcome to the", conferenceName, "booking application!")
	fmt.Printf("We have a total of %d tickets for %s, and %d tickets are remaining.\n", conferenceTickets, conferenceName, remainingTickets)
	fmt.Println("Get your tickets here to attend!")

	for {
		fmt.Print("Enter your first name: ")
		fmt.Scan(&firstName)

		fmt.Print("Enter your last name: ")
		fmt.Scan(&lastName)

		fullName := firstName + " " + lastName
		bookings = append(bookings, fullName)

		fmt.Print("Enter the number of tickets you want: ")
		fmt.Scan(&userTicket)

		if userTicket > remainingTickets {
			fmt.Printf("Sorry, we only have %d tickets remaining.\n", remainingTickets)
			continue
		}

		remainingTickets -= userTicket

		fmt.Printf("User %v booked %d tickets.\n", fullName, userTicket)
		fmt.Printf("Remaining tickets left: %d for %s.\n", remainingTickets, conferenceName)

		// Print first names of all bookings so far
		firstNames := getFirstNames(bookings)
		fmt.Println("First names of all bookings so far:", firstNames)
	}
}
