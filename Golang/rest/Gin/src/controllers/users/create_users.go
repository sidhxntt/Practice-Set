package users

import (
	"context"
	"net/http"

	"gin/src/models"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	// Decode & validate JSON body
	var input models.CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON body",
		})
		return
	}

	// Basic validation
	if input.Username == "" || input.Email == "" || input.Age <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing or invalid fields: username, email, age",
		})
		return
	}

	// Prepare user model
	var user models.User

	// Insert into Supabase Postgres
	err := db.DB.QueryRow(
		context.Background(),
		`INSERT INTO users (username, email, age)
		 VALUES ($1, $2, $3)
		 RETURNING id, username, email, age`,
		input.Username,
		input.Email,
		input.Age,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Age,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Return created user
	c.JSON(http.StatusCreated, user)
}
