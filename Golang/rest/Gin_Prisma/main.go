package main

// @title Gin API
// @version 1.0
// @description REST API using Gin
// @host localhost:8080
// @BasePath /

import (
	// _ "gin/docs"
	"gin_prisma/src"
)

func main() {
	src.Server()
}
