package posts

import (
	"net/http"

	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func DeletePost(c *gin.Context) {
	// Path param
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid post ID",
		})
		return
	}

	// Execute delete using request context
	cmd, err := db.DB.Exec(
		c.Request.Context(),
		"DELETE FROM posts WHERE id=$1",
		id,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if cmd.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Post not found",
		})
		return
	}

	// No content
	c.Status(http.StatusNoContent)
}
