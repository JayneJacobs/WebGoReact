package procondata

import (
	"fmt"

	"github.com/gorilla/websocket"
)

// Msg is a data struct for the json message
type Msg struct {
	Jwt  string `json:"jwt"`
	Type string `json:"type"`
	Data string `json:"data"`
}

// SendMsg is the Send Method for Msg struct
func SendMsg(j string, t string, d string, c *websocket.Conn) {
	m := Msg{j, t, d}
	if err := c.WriteJSON(m); err != nil {
		fmt.Println(err)
	}

}

// TryUser type is Email and Password
type TryUser struct {
	Email    string `json:"user"`
	Password string `json:"password"`
}

// AUser  type provides User, Role, FullName, and Password
type AUser struct {
	User     string `json:"user"`
	Role     string `json:"role"`
	FullName string `json:"mongod"`
	Password string `json:"ThisPassword"`
}
