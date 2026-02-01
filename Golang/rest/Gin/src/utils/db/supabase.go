package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool //global DB pool

func DBConnect(ctx context.Context, databaseURL string) error {
	var err error

	DB, err = pgxpool.New(ctx, databaseURL)
	if err != nil {
		return err
	}

	if err = DB.Ping(ctx); err != nil {
		return err
	}

	log.Println("Connected to Supabase Postgres")
	return nil
}
