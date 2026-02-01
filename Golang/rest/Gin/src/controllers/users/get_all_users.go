package users

import (
	"net/http"
	"strconv"

	"gin/src/models"
	"gin/src/utils"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	// Query params
	page, _ := strconv.Atoi(c.Query("page"))
	pageSize, _ := strconv.Atoi(c.Query("page_size"))

	// Validate / normalize pagination
	utils.CheckPaginationParams(&page, &pageSize)

	offset := (page - 1) * pageSize

	// Query users using request context
	rows, err := db.DB.Query(
		c.Request.Context(),
		`SELECT id, username, email, age
		 FROM users
		 ORDER BY id
		 LIMIT $1 OFFSET $2`,
		pageSize,
		offset,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	defer rows.Close()

	users := []models.User{}

	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Username, &u.Email, &u.Age); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		users = append(users, u)
	}

	// Return users
	c.JSON(http.StatusOK, users)
}
