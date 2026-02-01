package posts

import (
	"net/http"

	"gin/src/models"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func GetPost(c *gin.Context) {
	// Path param
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid post ID",
		})
		return
	}

	var p models.Post
	err := db.DB.QueryRow(
		c.Request.Context(),
		`SELECT id, user_id, title, content FROM posts WHERE id=$1`,
		id,
	).Scan(&p.ID, &p.UserID, &p.Title, &p.Content)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Post not found",
		})
		return
	}

	c.JSON(http.StatusOK, p)
}
