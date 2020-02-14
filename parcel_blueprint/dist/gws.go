package main

import "fmt"

// Greeting used for main and init
var Greeting string

func init() {
	Greeting = "This is go"
	fmt.Println(Greeting)
}

func main() {
	fmt.Println(Greeting)
}
