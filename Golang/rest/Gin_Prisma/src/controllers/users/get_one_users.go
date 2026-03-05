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

func GetUser(c *gin.Context) {
	// Path param
	idParam := c.Param("id")
	if idParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user ID",
		})
		return
	}

	// Convert to int
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User ID must be a number",
		})
		return
	}

	// Fetch user with posts
	u, err := db.Client.User.FindUnique(
		prisma.User.ID.Equals(id),
	).
		With(
			prisma.User.Posts.Fetch(),
		).
		Exec(c.Request.Context())

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

	// Map user
	user := models.User{
		ID:       u.ID,
		Username: u.Username,
		Email:    u.Email,
		Age:      u.Age,
	}

	// Map posts (FIXED)
	posts := make([]models.Post, 0, len(u.Posts()))
	for _, post := range u.Posts() {
		var content *string
		if c, ok := post.Content(); ok {
			content = &c
		}

		posts = append(posts, models.Post{
			ID:      post.ID,
			UserID:  post.UserID,
			Title:   post.Title,
			Content: content,
		})
	}

	user.Posts = posts

	c.JSON(http.StatusOK, user)
}
