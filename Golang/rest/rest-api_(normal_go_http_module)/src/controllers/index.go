package controllers

import (
	"net/http"

	"rest/src/controllers/posts"
	"rest/src/controllers/users"
	"rest/src/middlewares"
)

func RegisterRoutes() {

	/* ===================== USERS ===================== */

	// /users (collection)
	http.Handle(
		"/users",
		middlewares.LoggingMiddleware(
			middlewares.TimingMiddleware(
				middlewares.JsonMiddleware(
					http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
						switch r.Method {
						case http.MethodGet:
							users.GetUsers(w, r)
						case http.MethodPost:
							users.CreateUser(w, r)
						default:
							http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
						}
					}),
				),
			),
		),
	)

	// /users/{id} (single)
	http.Handle(
		"/users/",
		middlewares.LoggingMiddleware(
			middlewares.TimingMiddleware(
				middlewares.JsonMiddleware(
					http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
						switch r.Method {
						case http.MethodGet:
							users.GetUser(w, r)
						case http.MethodPatch:
							users.UpdateUser(w, r)
						case http.MethodDelete:
							users.DeleteUser(w, r)
						default:
							http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
						}
					}),
				),
			),
		),
	)

	/* ===================== POSTS ===================== */

	// /posts (collection)
	http.Handle(
		"/posts",
		middlewares.LoggingMiddleware(
			middlewares.TimingMiddleware(
				middlewares.JsonMiddleware(
					http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
						switch r.Method {
						case http.MethodGet:
							posts.GetPosts(w, r)
						case http.MethodPost:
							posts.CreatePost(w, r)
						default:
							http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
						}
					}),
				),
			),
		),
	)

	// /posts/{id} (single)
	http.Handle(
		"/posts/",
		middlewares.LoggingMiddleware(
			middlewares.TimingMiddleware(
				middlewares.JsonMiddleware(
					http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
						switch r.Method {
						case http.MethodGet:
							posts.GetPost(w, r)
						case http.MethodPatch:
							posts.UpdatePost(w, r)
						case http.MethodDelete:
							posts.DeletePost(w, r)
						default:
							http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
						}
					}),
				),
			),
		),
	)
}
