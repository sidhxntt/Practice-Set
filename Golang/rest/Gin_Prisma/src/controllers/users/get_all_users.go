package users

import (
	"net/http"
	"strconv"

	"gin_prisma/src/models"
	"gin_prisma/src/utils"
	"gin_prisma/src/utils/db"

	prisma "gin_prisma/src/generated/prisma"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	// Query params
	page, _ := strconv.Atoi(c.Query("page"))
	pageSize, _ := strconv.Atoi(c.Query("page_size"))

	// Validate / normalize pagination
	utils.CheckPaginationParams(&page, &pageSize)

	skip := (page - 1) * pageSize
	take := pageSize

	// Query users with Prisma
	prismaUsers, err := db.Client.User.FindMany().
		OrderBy(
			prisma.User.ID.Order(prisma.SortOrderAsc),
		).
		Skip(skip).
		Take(take).
		Exec(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Map Prisma models → API models
	users := make([]models.User, 0, len(prismaUsers))
	for _, user := range prismaUsers {
		users = append(users, models.User{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
			Age:      user.Age,
		})
	}

	// Response
	c.JSON(http.StatusOK, users)
}
