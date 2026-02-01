package users

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"rest/src/models"
	"rest/src/utils/db"
	"strings"
)

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/users/")
	if id == "" {
		http.Error(w, "Invalid user ID", 400)
		return
	}

	var input models.UpdateUserInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid body", 400)
		return
	}

	query := "UPDATE users SET "
	args := []interface{}{}
	i := 1

	if input.Username != nil {
		query += fmt.Sprintf("username=$%d,", i)
		args = append(args, *input.Username)
		i++
	}
	if input.Email != nil {
		query += fmt.Sprintf("email=$%d,", i)
		args = append(args, *input.Email)
		i++
	}
	if input.Age != nil {
		query += fmt.Sprintf("age=$%d,", i)
		args = append(args, *input.Age)
		i++
	}

	if len(args) == 0 {
		http.Error(w, "No fields to update", 400)
		return
	}

	query = query[:len(query)-1] // remove trailing comma
	query += fmt.Sprintf(" WHERE id=$%d", i)
	args = append(args, id)

	_, err := db.DB.Exec(context.Background(), query, args...)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
