package models

type Post struct {
	ID      int     `json:"id"`
	UserID  int     `json:"user_id"`
	Title   string  `json:"title"`
	Content *string `json:"content"`
}

type CreatePostInput struct {
	UserID  int    `json:"user_id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type UpdatePostInput struct {
	Title   *string `json:"title,omitempty"`
	Content *string `json:"content,omitempty"`
}

type DeletePostInput struct {
	ID int `json:"id"`
}

type GetPostInput struct {
	ID int `json:"id"`
}

type PaginatedPostsInput struct {
	Page     int `json:"page"`
	PageSize int `json:"page_size"`
}
