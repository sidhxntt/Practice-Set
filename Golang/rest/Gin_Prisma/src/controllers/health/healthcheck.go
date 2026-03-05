package health

import (
	"net/http"

	"gin_prisma/src/utils/db"

	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	var result []struct{}

	err := db.Client.Prisma.
		QueryRaw("SELECT 1").
		Exec(c.Request.Context(), &result)

	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"status": "unhealthy",
			"db":     "down",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"db":     "up",
	})
}
