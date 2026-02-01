package posts

import (
	"net/http"

	"gin/src/models"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func GetPosts(c *gin.Context) {
	rows, err := db.DB.Query(
		c.Request.Context(),
		`SELECT id, user_id, title, content FROM posts ORDER BY id`,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	defer rows.Close()

	posts := []models.Post{}

	for rows.Next() {
		var p models.Post
		if err := rows.Scan(&p.ID, &p.UserID, &p.Title, &p.Content); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		posts = append(posts, p)
	}

	c.JSON(http.StatusOK, posts)
}
