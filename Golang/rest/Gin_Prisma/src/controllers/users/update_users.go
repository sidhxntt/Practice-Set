package users

import (
	"errors"
	"net/http"
	"strconv"

	"gin_prisma/src/models"
	"gin_prisma/src/utils/db"

	prisma "gin_prisma/src/generated/prisma"

	"github.com/gin-gonic/gin"
)

func UpdateUser(c *gin.Context) {
	// Path param
	idParam := c.Param("id")
	if idParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	// Convert ID to int
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User ID must be a number",
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

	// Build update setters dynamically
	update := []prisma.UserSetParam{}

	if input.Username != nil {
		update = append(update, prisma.User.Username.Set(*input.Username))
	}
	if input.Email != nil {
		update = append(update, prisma.User.Email.Set(*input.Email))
	}
	if input.Age != nil {
		update = append(update, prisma.User.Age.Set(*input.Age))
	}

	if len(update) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No fields to update",
		})
		return
	}

	// Execute update
	_, err = db.Client.User.FindUnique(
		prisma.User.ID.Equals(id),
	).Update(
		update...,
	).Exec(c.Request.Context())

	if err != nil {
		if errors.Is(err, prisma.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "User not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// No content
	c.Status(http.StatusNoContent)
}
