package middlewares

import (
	"fmt"
	"net/http"
)

// LoggingMiddleware is a simple middleware that logs the request method and URL path.
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		fmt.Println("Method:", req.Method, "Path:", req.URL.Path)
		next.ServeHTTP(res, req) // Call the next handler in the middleware chain or else the final handler if not done then request will hang
	})
}
