package health

import (
	"net/http"

	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	// Optional DB ping
	if db.DB != nil {
		if err := db.DB.Ping(c.Request.Context()); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{
				"status": "unhealthy",
				"db":     "down",
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
