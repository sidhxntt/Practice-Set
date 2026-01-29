package util

import (
	"fmt"
	"net/http"
	"time"
)

// LoggingMiddleware is a simple middleware that logs the request method and URL path.
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		fmt.Println("Method:", req.Method, "Path:", req.URL.Path)
		next.ServeHTTP(res, req) // Call the next handler in the middleware chain or else the final handler if not done then request will hang
	})
}

// This ensures every response has Content-Type: application/json.
func JsonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(res, req)
	})
}

func TimingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {

		// Record start time
		start := time.Now()

		// Call the next handler
		next.ServeHTTP(res, req)

		// Log how long the request took
		duration := time.Since(start)
		fmt.Println("Request took:", duration)
	})
}
