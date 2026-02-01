package users

import (
	"net/http"

	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func DeleteUser(c *gin.Context) {
	// Get path parameter
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	// Execute delete query using request context
	cmd, err := db.DB.Exec(
		c.Request.Context(),
		"DELETE FROM users WHERE id=$1",
		id,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Check affected rows
	if cmd.RowsAffected() == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	// No content response
	c.Status(http.StatusNoContent)
}
