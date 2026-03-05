package db

import (
	"context"
	"log"

	prisma "gin_prisma/src/generated/prisma"
)

var Client *prisma.PrismaClient

func Connect() error {
	Client = prisma.NewClient()

	if err := Client.Prisma.Connect(); err != nil {
		return err
	}

	log.Println("Prisma connected to database")
	return nil
}

func Disconnect(ctx context.Context) {
	if Client != nil {
		if err := Client.Prisma.Disconnect(); err != nil {
			log.Println("Prisma disconnect error:", err)
		}
	}
}
