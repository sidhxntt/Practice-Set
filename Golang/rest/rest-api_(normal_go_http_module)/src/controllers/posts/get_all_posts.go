package posts

import (
	"context"
	"encoding/json"
	"net/http"
	"rest/src/models"
	"rest/src/utils/db"
)

func GetPosts(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query(
		context.Background(),
		`SELECT id, user_id, title, content FROM posts ORDER BY id`,
	)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer rows.Close()

	posts := []models.Post{}

	for rows.Next() {
		var p models.Post
		if err := rows.Scan(&p.ID, &p.UserID, &p.Title, &p.Content); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		posts = append(posts, p)
	}

	json.NewEncoder(w).Encode(posts)
}
