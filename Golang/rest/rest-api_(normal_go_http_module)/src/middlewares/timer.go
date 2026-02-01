package middlewares

import (
	"fmt"
	"net/http"
	"time"
)

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
