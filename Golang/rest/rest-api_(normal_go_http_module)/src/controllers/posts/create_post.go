package posts

import (
	"context"
	"encoding/json"
	"net/http"

	"rest/src/models"
	"rest/src/utils/db"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	var input models.CreatePostInput

	// Decode JSON body
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	// Validate input (UUIDs are strings)
	if input.UserID == "" || input.Title == "" {
		http.Error(w, "Missing required fields: user_id, title", http.StatusBadRequest)
		return
	}

	var post models.Post

	// Insert into Supabase (schema-qualified)
	err := db.DB.QueryRow(
		context.Background(),
		`INSERT INTO public.posts (user_id, title, content)
		 VALUES ($1, $2, $3)
		 RETURNING id, user_id, title, content`,
		input.UserID,
		input.Title,
		input.Content,
	).Scan(
		&post.ID,
		&post.UserID,
		&post.Title,
		&post.Content,
	)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return created post
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}
