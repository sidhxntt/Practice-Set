package src

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"gin/src/controllers"
	"gin/src/utils"
	"gin/src/utils/db"

	"github.com/gin-gonic/gin"
)

const (
	serverAddr      = ":8080"
	shutdownTimeout = 10 * time.Second
)

func Server() {
	fmt.Println("Starting server...")

	/* ---------- ENV ---------- */
	dbURL := utils.GetDBURL()

	/* ---------- DB ---------- */

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	fmt.Println("Connecting to Supabase Postgres...")
	if err := db.DBConnect(ctx, dbURL); err != nil {
		log.Fatal(err)
	}
	defer func() {
		if db.DB != nil {
			db.DB.Close()
			log.Println("Database connection closed")
		}
	}()

	/* ---------- ROUTER ---------- */

	gin.SetMode(gin.ReleaseMode) // change to DebugMode if needed

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

	<-ctx.Done() // wait for SIGINT/SIGTERM
	log.Println("Shutdown signal received")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("Forced shutdown: %v\n", err)
	}

	log.Println("Server exited gracefully")
}
