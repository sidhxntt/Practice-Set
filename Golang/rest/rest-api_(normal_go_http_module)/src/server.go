package src

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"rest/src/controllers"
	"rest/src/utils/db"

	"github.com/joho/godotenv"
)

func Server() {
	fmt.Println("Starting server...")

	// Load .env file (optional)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	dbURL := os.Getenv("SUPABASE_DB_URL")
	if dbURL == "" {
		log.Fatal("SUPABASE_DB_URL environment variable is not set")
	}

	// Connect to database
	fmt.Println("Connecting to Supabase Postgres...")
	db.DBConnect(dbURL)
	// defer db.Close() // if you expose Close()

	// Register routes
	controllers.RegisterRoutes()

	// Create HTTP server with timeouts
	server := &http.Server{
		Addr:         ":8080",
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(server.ListenAndServe())
}
