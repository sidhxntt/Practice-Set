package utils

import (
	"fmt"
	"net/url"
	"os"
)

func CheckError(err error) {
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
}

func ParseURL(rawURL string) (map[string]string, error) {
	parsed, err := url.Parse(rawURL)
	if err != nil {
		return nil, err
	}

	components := map[string]string{
		"Scheme":      parsed.Scheme,
		"Host":        parsed.Hostname(),
		"Port":        parsed.Port(),
		"Path":        parsed.Path,
		"RawQuery":    parsed.RawQuery,
		"QueryParams": parsed.Query().Encode(),
	}

	return components, nil
}
