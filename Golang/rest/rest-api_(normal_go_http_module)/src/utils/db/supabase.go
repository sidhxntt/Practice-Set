package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool //global DB pool

func DBConnect(databaseURL string) {
	var err error

	DB, err = pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}

	if err = DB.Ping(context.Background()); err != nil {
		log.Fatal("Database ping failed:", err)
	}

	log.Println("Connected to Supabase Postgres")
}
