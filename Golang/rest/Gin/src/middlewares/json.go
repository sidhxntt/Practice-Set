package middlewares

import "github.com/gin-gonic/gin"

// JsonMiddleware ensures every response has Content-Type: application/json.
func JsonMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Content-Type", "application/json")
		c.Next() // call the next middleware/handler
	}
}
