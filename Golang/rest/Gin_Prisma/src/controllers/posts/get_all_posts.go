package posts

import (
	"net/http"

	"gin_prisma/src/models"
	"gin_prisma/src/utils/db"

	prisma "gin_prisma/src/generated/prisma"

	"github.com/gin-gonic/gin"
)

func GetPosts(c *gin.Context) {
	// Fetch all posts ordered by ID
	prismaPosts, err := db.Client.Post.FindMany().
		OrderBy(
			prisma.Post.ID.Order(prisma.SortOrderAsc),
		).
		Exec(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Map Prisma models → API models
	posts := make([]models.Post, 0, len(prismaPosts))

	for _, p := range prismaPosts {
		var content *string
		if c, ok := p.Content(); ok {
			content = &c
		}

		posts = append(posts, models.Post{
			ID:      p.ID,
			UserID:  p.UserID,
			Title:   p.Title,
			Content: content,
		})
	}

	c.JSON(http.StatusOK, posts)
}
