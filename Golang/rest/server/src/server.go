package server

import (
	"fmt"
	"net/http"
	"server/util"
)

func Server() {
	// Register routes
	util.GetMethod("/get")
	util.PostMethod("/post")

	// Start HTTP server
	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
