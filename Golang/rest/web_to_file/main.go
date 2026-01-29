package main

import (
	getcontent "web_to_file/get_content"
	utils "web_to_file/utils"
	writetofile "web_to_file/write_to_file"
)

const url = "https://en.wikipedia.org/wiki/Go_(programming_language)"

func displayURLComponents() {
	components, err := utils.ParseURL(url)
	utils.CheckError(err)

	for key, value := range components {
		println(key + ": " + value)
	}
}

func main() {
	content := getcontent.GetContent(url)
	writetofile.WriteHTMLToFile("go_language.html", content)

	displayURLComponents()

}
