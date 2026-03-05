package middlewares

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

// TimingMiddleware logs how long each request takes.
func TimingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()

		// Process request
		c.Next()

		// After request
		duration := time.Since(start)
		fmt.Println("Request took:", duration)
	}
}
