package middlewares

import (
	"net/http"
)

// This ensures every response has Content-Type: application/json.
func JsonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(res, req)
	})
}
