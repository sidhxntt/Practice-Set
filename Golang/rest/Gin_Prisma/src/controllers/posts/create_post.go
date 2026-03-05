package posts

import (
	"net/http"

	"gin_prisma/src/models"
	"gin_prisma/src/utils/db"

	prisma "gin_prisma/src/generated/prisma"

	"github.com/gin-gonic/gin"
)

func CreatePost(c *gin.Context) {
	var input models.CreatePostInput

	// Decode JSON
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON body",
		})
		return
	}

	// Validate
	if input.UserID <= 0 || input.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing required fields: user_id, title",
		})
		return
	}

	// ✅ CREATE POST USING RELATION LINKING
	post, err := db.Client.Post.CreateOne(
		// REQUIRED scalar field
		prisma.Post.Title.Set(input.Title),

		// REQUIRED relation (THIS IS THE KEY FIX)
		prisma.Post.User.Link(
			prisma.User.ID.Equals(input.UserID),
		),

		// OPTIONAL field
		prisma.Post.Content.Set(input.Content),
	).Exec(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Map nullable content
	var content *string
	if c, ok := post.Content(); ok {
		content = &c
	}

	c.JSON(http.StatusCreated, models.Post{
		ID:      post.ID,
		UserID:  post.UserID,
		Title:   post.Title,
		Content: content,
	})
}
