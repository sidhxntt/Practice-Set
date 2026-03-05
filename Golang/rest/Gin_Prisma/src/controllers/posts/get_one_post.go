package posts

import (
	"errors"
	"net/http"
	"strconv"

	"gin_prisma/src/models"
	"gin_prisma/src/utils/db"

	prisma "gin_prisma/src/generated/prisma"

	"github.com/gin-gonic/gin"
)

func GetPost(c *gin.Context) {
	// Path param
	idParam := c.Param("id")
	if idParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid post ID",
		})
		return
	}

	// Convert to int (Prisma ID is Int)
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Post ID must be a number",
		})
		return
	}

	// Fetch post
	p, err := db.Client.Post.FindUnique(
		prisma.Post.ID.Equals(id),
	).Exec(c.Request.Context())

	if err != nil {
		if errors.Is(err, prisma.ErrNotFound) {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Post not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Handle nullable content
	var content *string
	if c, ok := p.Content(); ok {
		content = &c
	}

	post := models.Post{
		ID:      p.ID,
		UserID:  p.UserID,
		Title:   p.Title,
		Content: content,
	}

	c.JSON(http.StatusOK, post)
}
