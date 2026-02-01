package models

type Post struct {
	ID      string `json:"id"`
	UserID  string `json:"user_id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type CreatePostInput struct {
	UserID  string `json:"user_id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type UpdatePostInput struct {
	Title   *string `json:"title,omitempty"`
	Content *string `json:"content,omitempty"`
}

type DeletePostInput struct {
	ID string `json:"id"`
}

type GetPostInput struct {
	ID string `json:"id"`
}

type PaginatedPostsInput struct {
	Page     int `json:"page"`
	PageSize int `json:"page_size"`
}
