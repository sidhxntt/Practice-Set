package posts

import (
	"context"
	"encoding/json"
	"net/http"
	"rest/src/models"
	"rest/src/utils/db"
	"strings"
)

func GetPost(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/posts/")
	if id == "" {
		http.Error(w, "Invalid post ID", 400)
		return
	}

	var p models.Post
	err := db.DB.QueryRow(
		context.Background(),
		`SELECT id, user_id, title, content FROM posts WHERE id=$1`,
		id,
	).Scan(&p.ID, &p.UserID, &p.Title, &p.Content)

	if err != nil {
		http.Error(w, "Post not found", 404)
		return
	}

	json.NewEncoder(w).Encode(p)
}
