package models

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Age      int    `json:"age"`
	Posts    []Post `json:"posts,omitempty"`
}

type CreateUserInput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Age      int    `json:"age"`
}

type UpdateUserInput struct {
	Username *string `json:"username,omitempty"`
	Email    *string `json:"email,omitempty"`
	Age      *int    `json:"age,omitempty"`
}

type DeleteUserInput struct {
	ID string `json:"id"`
}

type GetUserInput struct {
	ID string `json:"id"`
}

type PaginatedUsersInput struct {
	Page     int `json:"page"`
	PageSize int `json:"page_size"`
}
