package main

import (
	getcontent "web_to_file/get_content"
	writetofile "web_to_file/write_to_file"
)

const url = "https://en.wikipedia.org/wiki/Go_(programming_language)"

func main() {
	content := getcontent.GetContent(url)
	writetofile.WriteHTMLToFile("go_language.html", content)

}
