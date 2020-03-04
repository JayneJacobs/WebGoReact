package procondata

import "fmt"
import "github.com/gorilla/websocket"

// Msg is a data struct for the json message
type Msg struct {
	Jwt  string `json:"jwt"`
	Type string `json:"type"`
	Data string `json:"data"`
}

// SendMsg is the Send Method for Msg struct
func SendMsg(j string, t string, d string, c *websocket.Conn) {
	m := Msg{j, t, d}
	if err := c.WriteJSON; err != nil {
		fmt.Println(err, string(err))
	}

}
