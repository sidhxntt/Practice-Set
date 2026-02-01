package posts

import (
	"context"
	"net/http"
	"rest/src/utils/db"
	"strings"
)

func DeletePost(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/posts/")
	if id == "" {
		http.Error(w, "Invalid post ID", 400)
		return
	}

	cmd, err := db.DB.Exec(
		context.Background(),
		"DELETE FROM posts WHERE id=$1",
		id,
	)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	if cmd.RowsAffected() == 0 {
		http.Error(w, "Post not found", 404)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
