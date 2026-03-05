package users

import (
	"net/http"

	"gin_prisma/src/models"
	"gin_prisma/src/utils/db"

	prisma "gin_prisma/src/generated/prisma"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var input models.CreateUserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON body",
		})
		return
	}

	if input.Username == "" || input.Email == "" || input.Age <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing or invalid fields",
		})
		return
	}

	user, err := db.Client.User.CreateOne(
		prisma.User.Username.Set(input.Username),
		prisma.User.Email.Set(input.Email),
		prisma.User.Age.Set(input.Age),
	).Exec(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":       user.ID,
		"username": user.Username,
		"email":    user.Email,
		"age":      user.Age,
	})
}
