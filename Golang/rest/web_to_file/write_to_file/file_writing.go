package writetofile

import (
	"os"
	"path/filepath"
	"web_to_file/utils"
)

func WriteHTMLToFile(filename string, content string) {
	// Ensure the output directory exists
	outputDir := "output"
	err := os.MkdirAll(outputDir, 0755)
	utils.CheckError(err)

	// Build the full file path: output/filename
	filePath := filepath.Join(outputDir, filename)

	// Create (or overwrite) the HTML file
	file, err := os.Create(filePath)
	utils.CheckError(err)
	defer file.Close()

	// Write the HTML content to the file
	_, err = file.WriteString(content)
	utils.CheckError(err)
}
