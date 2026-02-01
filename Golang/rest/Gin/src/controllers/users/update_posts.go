package users

import (
	"fmt"
	"net/http"

	"gin/src/models"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func UpdateUser(c *gin.Context) {
	// Path param
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	// Decode JSON body
	var input models.UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid body",
		})
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

	// No content response
	c.Status(http.StatusNoContent)
}
