package getcontent

import (
	"fmt"
	"net/http"
	"time"
	"web_to_file/utils"

	// "path/filepath"
	"io"
)

const url = "https://en.wikipedia.org/wiki/Go_(programming_language)"

func GetContent(url string) string {
	// Create a custom HTTP client with a timeout.
	// This prevents the request from hanging forever.
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Create a new HTTP GET request for the given URL.
	// Using NewRequest allows us to customize headers.
	req, err := http.NewRequest(http.MethodGet, url, nil)
	utils.CheckError(err)

	// Set a User-Agent header.
	// Wikipedia requires a descriptive User-Agent for all requests.
	req.Header.Set(
		"User-Agent",
		"MyGoFetcher/1.0 (https://example.com/contact)",
	)

	// Execute the HTTP request using the client.
	resp, err := client.Do(req)
	utils.CheckError(err)

	// Ensure the response body is closed after we finish reading it.
	// This prevents resource leaks.
	defer resp.Body.Close()

	// Check if the server returned a successful HTTP status code (200 OK).
	// If not, treat it as an error.
	if resp.StatusCode != http.StatusOK {
		utils.CheckError(
			fmt.Errorf(
				"failed to fetch URL: %s, status code: %d",
				url,
				resp.StatusCode,
			),
		)
	}

	// Read the entire response body into memory.
	// This returns a byte slice ([]byte).
	data, err := io.ReadAll(resp.Body)
	utils.CheckError(err)

	// Convert the byte slice to a string and return it.
	return string(data)
}
