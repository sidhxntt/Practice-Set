package users

import (
	"context"
	"encoding/json"
	"net/http"
	"rest/src/models"
	"rest/src/utils/db"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Allow only POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Decode request body into input schema
	var input models.CreateUserInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	// Basic validation
	if input.Username == "" || input.Email == "" || input.Age <= 0 {
		http.Error(w, "Missing or invalid fields add username, email, age", http.StatusBadRequest)
		return
	}

	// Prepare user model
	var user models.User

	// Insert into Supabase Postgres
	err := db.DB.QueryRow(
		context.Background(),
		`INSERT INTO users (username, email, age)
		 VALUES ($1, $2, $3)
		 RETURNING id, username, email, age`,
		input.Username,
		input.Email,
		input.Age,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Age,
	)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return created user
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}
