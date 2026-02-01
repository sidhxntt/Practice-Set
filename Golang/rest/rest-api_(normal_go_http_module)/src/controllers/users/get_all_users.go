package users

import (
	"context"
	"encoding/json"
	"net/http"
	"rest/src/models"
	"rest/src/utils"
	"rest/src/utils/db"
	"strconv"
)

func GetUsers(res http.ResponseWriter, req *http.Request) {
	page, _ := strconv.Atoi(req.URL.Query().Get("page"))
	pageSize, _ := strconv.Atoi(req.URL.Query().Get("page_size"))

	utils.CheckPaginationParams(&page, &pageSize)

	offset := (page - 1) * pageSize

	rows, err := db.DB.Query(
		context.Background(),
		`SELECT id, username, email, age
		 FROM users
		 ORDER BY id
		 LIMIT $1 OFFSET $2`,
		pageSize,
		offset,
	)
	if err != nil {
		http.Error(res, err.Error(), 500)
		return
	}
	defer rows.Close()

	users := []models.User{}

	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Username, &u.Email, &u.Age); err != nil {
			http.Error(res, err.Error(), 500)
			return
		}
		users = append(users, u)
	}

	json.NewEncoder(res).Encode(users)
}
