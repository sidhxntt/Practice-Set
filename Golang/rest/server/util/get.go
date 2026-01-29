package util

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type GetResponse struct {
	Message string `json:"message"`
	Path    string `json:"path"`
}

func GetMethod(path string) {
	// Create the actual handler logic. This handler will respond to HTTP requests sent to
	handler := http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {

		// Allow only GET requests
		if req.Method != http.MethodGet {
			http.Error(res, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Set response headers to JSON
		res.Header().Set("Content-Type", "application/json")
		res.WriteHeader(http.StatusOK)

		// Create a JSON response
		response := GetResponse{
			Message: "Hello from GET!",
			Path:    req.URL.Path,
		}

		// Encode and send JSON response
		json.NewEncoder(res).Encode(response)
		fmt.Println("Handled GET request:", response)
	})

	// Wrap handler with middleware (req -> logging -> timing -> json content type -> handler -> res)
	http.Handle(path,
		LoggingMiddleware(
			TimingMiddleware(
				JsonMiddleware(handler),
			),
		),
	)
}
