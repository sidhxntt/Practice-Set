package posts

import (
	"net/http"

	"gin/src/models"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func CreatePost(c *gin.Context) {
	var input models.CreatePostInput

	// Decode & validate JSON body
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON body",
		})
		return
	}

	// Validate input
	if input.UserID == "" || input.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing required fields: user_id, title",
		})
		return
	}

	var post models.Post

	// Insert into Supabase Postgres
	err := db.DB.QueryRow(
		c.Request.Context(),
		`INSERT INTO public.posts (user_id, title, content)
		 VALUES ($1, $2, $3)
		 RETURNING id, user_id, title, content`,
		input.UserID,
		input.Title,
		input.Content,
	).Scan(
		&post.ID,
		&post.UserID,
		&post.Title,
		&post.Content,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Return created post
	c.JSON(http.StatusCreated, post)
}
