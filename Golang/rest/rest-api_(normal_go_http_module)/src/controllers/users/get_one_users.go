package users

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"
	"rest/src/models"
	"rest/src/utils/db"
	"strings"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/users/")
	if id == "" {
		http.Error(w, "Invalid user ID", 400)
		return
	}

	rows, err := db.DB.Query(context.Background(), `
		SELECT
			u.id, u.username, u.email, u.age,
			p.id, p.title
		FROM users u
		LEFT JOIN posts p ON p.user_id = u.id
		WHERE u.id = $1
	`, id)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer rows.Close()

	var user models.User
	posts := []models.Post{}
	found := false

	for rows.Next() {
		var post models.Post
		var postID sql.NullString
		var title sql.NullString

		err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Age,
			&postID,
			&title,
		)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		found = true

		if postID.Valid {
			post.ID = postID.String
			post.Title = title.String
			posts = append(posts, post)
		}

	}

	if !found {
		http.Error(w, "User not found", 404)
		return
	}

	user.Posts = posts
	json.NewEncoder(w).Encode(user)
}
