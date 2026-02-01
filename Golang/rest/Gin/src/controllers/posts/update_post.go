package posts

import (
	"fmt"
	"net/http"

	"gin/src/models"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func UpdatePost(c *gin.Context) {
	// Path param
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid post ID",
		})
		return
	}

	// Decode JSON body
	var input models.UpdatePostInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid body",
		})
		return
	}

	query := "UPDATE posts SET "
	args := []interface{}{}
	i := 1

	if input.Title != nil {
		query += fmt.Sprintf("title=$%d,", i)
		args = append(args, *input.Title)
		i++
	}
	if input.Content != nil {
		query += fmt.Sprintf("content=$%d,", i)
		args = append(args, *input.Content)
		i++
	}

	if len(args) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No fields to update",
		})
		return
	}

	// Remove trailing comma
	query = query[:len(query)-1]
	query += fmt.Sprintf(" WHERE id=$%d", i)
	args = append(args, id)

	// Execute update using request context
	_, err := db.DB.Exec(c.Request.Context(), query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// No content
	c.Status(http.StatusNoContent)
}
