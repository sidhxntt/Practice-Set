package posts

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"rest/src/models"
	"rest/src/utils/db"
	"strings"
)

func UpdatePost(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/posts/")
	if id == "" {
		http.Error(w, "Invalid post ID", 400)
		return
	}

	var input models.UpdatePostInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid body", 400)
		return
	}

	query := "UPDATE posts SET "
	args := []interface{}{}
	i := 1

	if input.Title != nil {
		query += fmt.Sprintf("title=$%d,", i)
		args = append(args, *input.Title)
		i++
	}
	if input.Content != nil {
		query += fmt.Sprintf("content=$%d,", i)
		args = append(args, *input.Content)
		i++
	}

	if len(args) == 0 {
		http.Error(w, "No fields to update", 400)
		return
	}

	query = query[:len(query)-1]
	query += fmt.Sprintf(" WHERE id=$%d", i)
	args = append(args, id)

	_, err := db.DB.Exec(context.Background(), query, args...)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
