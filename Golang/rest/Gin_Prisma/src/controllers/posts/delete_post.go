package posts

import (
	"errors"
	"net/http"
	"strconv"

	"gin_prisma/src/utils/db"

	prisma "gin_prisma/src/generated/prisma"

	"github.com/gin-gonic/gin"
)

func DeletePost(c *gin.Context) {
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

	// Delete post using Prisma
	_, err = db.Client.Post.FindUnique(
		prisma.Post.ID.Equals(id),
	).Delete().Exec(c.Request.Context())

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
