package users

import (
	"database/sql"
	"net/http"

	"gin/src/models"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func GetUser(c *gin.Context) {
	// Path param
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	rows, err := db.DB.Query(
		c.Request.Context(),
		`
		SELECT
			u.id, u.username, u.email, u.age,
			p.id, p.title
		FROM users u
		LEFT JOIN posts p ON p.user_id = u.id
		WHERE u.id = $1
		`,
		id,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
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

		if err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Age,
			&postID,
			&title,
		); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
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
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	user.Posts = posts

	c.JSON(http.StatusOK, user)
}
