package users

import (
	"context"
	"net/http"
	"rest/src/utils/db"
	"strings"
)

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/users/")
	if id == "" {
		http.Error(w, "Invalid user ID", 400)
		return
	}

	cmd, err := db.DB.Exec(
		context.Background(),
		"DELETE FROM users WHERE id=$1",
		id,
	)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	if cmd.RowsAffected() == 0 {
		http.Error(w, "User not found", 404)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
