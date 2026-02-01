package controllers

import (
	"gin/src/controllers/health"
	"gin/src/controllers/posts"
	"gin/src/controllers/users"
	"gin/src/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

/* ===================== USERS ===================== */

func RegisterUserRoutes(r *gin.Engine) {
	usersGroup := r.Group("/users")
	usersGroup.Use(
		middlewares.JsonMiddleware(),
		middlewares.TimingMiddleware(),
	)
	{
		usersGroup.GET("", users.GetUsers)
		usersGroup.POST("", users.CreateUser)

		usersGroup.GET("/:id", users.GetUser)
		usersGroup.PATCH("/:id", users.UpdateUser)
		usersGroup.DELETE("/:id", users.DeleteUser)
	}
}

/* ===================== POSTS ===================== */

func RegisterPostRoutes(r *gin.Engine) {
	postsGroup := r.Group("/posts")
	postsGroup.Use(
		middlewares.JsonMiddleware(),
		middlewares.TimingMiddleware(),
	)
	{
		postsGroup.GET("", posts.GetPosts)
		postsGroup.POST("", posts.CreatePost)

		postsGroup.GET("/:id", posts.GetPost)
		postsGroup.PATCH("/:id", posts.UpdatePost)
		postsGroup.DELETE("/:id", posts.DeletePost)
	}
}

/* ===================== HEALTH ===================== */

func RegisterHealthRoutes(r *gin.Engine) {
	r.GET("/health", health.HealthCheck)
}

/* ===================== INFRA ===================== */

func RegisterInfraRoutes(r *gin.Engine) {
	r.GET("/metrics", gin.WrapH(promhttp.Handler()))
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
