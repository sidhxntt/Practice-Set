package src

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"gin_prisma/src/controllers"
	"gin_prisma/src/utils/db"

	"github.com/gin-gonic/gin"
)

const (
	serverAddr      = ":8080"
	shutdownTimeout = 10 * time.Second
)

func Server() {
	fmt.Println("Starting server...")

	/* ---------- CONTEXT ---------- */

	ctx, stop := signal.NotifyContext(
		context.Background(),
		syscall.SIGINT,
		syscall.SIGTERM,
	)
	defer stop()

	/* ---------- PRISMA DB ---------- */

	fmt.Println("Connecting to Supabase Postgres via Prisma...")
	if err := db.Connect(); err != nil {
		log.Fatal(err)
	}

	// Ensure Prisma disconnects on shutdown
	go func() {
		<-ctx.Done()
		log.Println("Disconnecting Prisma...")
		db.Disconnect(context.Background())
	}()

	/* ---------- ROUTER ---------- */

	gin.SetMode(gin.ReleaseMode)

	router := gin.New()
	router.Use(
		gin.Logger(),
		gin.Recovery(),
	)

	controllers.RegisterUserRoutes(router)
	controllers.RegisterPostRoutes(router)
	controllers.RegisterHealthRoutes(router)
	controllers.RegisterInfraRoutes(router)

	/* ---------- HTTP SERVER ---------- */

	server := &http.Server{
		Addr:         serverAddr,
		Handler:      router,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Printf("Server running at http://localhost%s\n", serverAddr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	/* ---------- SHUTDOWN ---------- */

	<-ctx.Done()
	log.Println("Shutdown signal received")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("Forced shutdown: %v\n", err)
	}

	log.Println("Server exited gracefully")
}
