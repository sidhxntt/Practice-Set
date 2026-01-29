package util

import (
	"encoding/json"
	"fmt"
	"net/http" // The Go HTTP server automatically closes req.Body
)

type PostInput struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Age   int    `json:"age"`
}

type PostResponse struct {
	Message string    `json:"message"`
	Path    string    `json:"path"`
	Data    PostInput `json:"data"`
}

func PostMethod(path string) {
	// Create the actual handler logic. This handler will respond to HTTP POST requests.
	handler := http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {

		// Allow only POST requests
		if req.Method != http.MethodPost {
			http.Error(res, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Decode JSON request body into the input schema
		var input PostInput
		err := json.NewDecoder(req.Body).Decode(&input)
		if err != nil {
			http.Error(res, "Invalid JSON body", http.StatusBadRequest)
			return
		}

		// Basic validation (manual, no library)
		if input.Name == "" || input.Email == "" || input.Age <= 0 {
			http.Error(res, "Missing or invalid fields, add name, email, age", http.StatusBadRequest)
			return
		}

		// Create JSON response
		response := PostResponse{
			Message: "POST request successful",
			Path:    req.URL.Path,
			Data:    input,
		}

		fmt.Println("Received POST data:", response)

		// Send JSON response
		res.WriteHeader(http.StatusOK)
		json.NewEncoder(res).Encode(response)
	})

	// Wrap handler with middleware (req -> logging -> timing -> json -> handler -> res)
	http.Handle(
		path,
		LoggingMiddleware(
			TimingMiddleware(
				JsonMiddleware(handler),
			),
		),
	)
}
