package main

import (
	"flag"
	"fmt"
	"go_systems/procondata"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "0.0.0.0:1200", "http service address")
var upgrader = websocket.Upgrader{} // default options

func handleAPI(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Print("WTF @HandleAPI Ws UpgradeError> ", err)
		return
	}

Loop:
	for {
		in := procondata.Msg{}

		err := c.ReadJSON(&in)
		if err != nil {
			c.Close()
			break Loop
		}
		switch in.Type {
		case "client-hello-msg":
			procondata.SendMsg("^vAr^", "server-ws-connect-success-msg", "Hello There from Go", c)
			break
		default:
			break
		}
	}
}

func main() {
	fmt.Println("This is from the Go Main Fumction")
	flag.Parse()

	// look into subrouter
	r := mux.NewRouter()

	//Websocket API
	r.HandleFunc("/ws", handleAPI)
	http.ListenAndServeTLS(*addr, "/etc/letsencrypt/live/pr0con.selfmanagedmusician.com/cert.pem", "/etc/letsencrypt/live/pr0con.selfmanagedmusician.com/privkey.pem", r)
}
