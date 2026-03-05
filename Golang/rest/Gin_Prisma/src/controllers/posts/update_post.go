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

func UpdatePost(c *gin.Context) {
	// Path param
	idParam := c.Param("id")
	if idParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid post ID",
		})
		return
	}

	// Convert ID to int (Prisma ID is Int)
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Post ID must be a number",
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

	// Build update setters dynamically
	update := []prisma.PostSetParam{}

	if input.Title != nil {
		update = append(update, prisma.Post.Title.Set(*input.Title))
	}
	if input.Content != nil {
		// content is nullable → Set(*input.Content)
		update = append(update, prisma.Post.Content.Set(*input.Content))
	}

	if len(update) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No fields to update",
		})
		return
	}

	// Execute update
	_, err = db.Client.Post.FindUnique(
		prisma.Post.ID.Equals(id),
	).Update(
		update...,
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

	// No content
	c.Status(http.StatusNoContent)
}
