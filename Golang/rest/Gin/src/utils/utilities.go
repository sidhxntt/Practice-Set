package utils

import (
	"log"

	"os"

	"github.com/joho/godotenv"
)

func CheckPaginationParams(page, pageSize *int) {
	if *page <= 0 {
		*page = 1
	}
	if *pageSize <= 0 {
		*pageSize = 10
	}
}

func GetDBURL() string {
	_ = godotenv.Load() // optional

	dbURL := os.Getenv("SUPABASE_DB_URL")
	if dbURL == "" {
		log.Fatal("SUPABASE_DB_URL environment variable is not set")
	}
	return dbURL
}
