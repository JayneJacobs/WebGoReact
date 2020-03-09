package main

import (
	"flag"
	"fmt"
	"go_systems/pr0config"
	"go_systems/procondata"
	"go_systems/proconjwt"
	"go_systems/proconutil"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "0.0.0.0:1200", "http service address")
var upgrader = websocket.Upgrader{} // default options

func handleAPI(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("WTF @HandleAPI Ws UpgradeError> ", err)
		return
	}
	id, err := uuid.NewRandom()
	if err != nil {
		fmt.Println("WTF is up here in handleAPI", err)
	}

	c.UUID = "ws-" + id.String()

Loop:
	for {
		in := procondata.Msg{}

		err := c.ReadJSON(&in)
		if err != nil {
			fmt.Println(in.Data, err)
			c.Close()
			break Loop
		}
		switch in.Type {
		case "register-client-msg":
			procondata.SendMsg("^vAr^", "server-ws-connect-success-msg", c.UUID, c)
			jwt, err := proconjwt.GenerateJWT(pr0config.PrivKeyFile, "fake name", "fake alias", "fake@email.com", "Admin")
			if err != nil {
				fmt.Println("Jwt Generation Failed(in gws Loop)", err)
			}
			procondata.SendMsg("^vAr^", "server-ws-connect-sucess-jwt", jwt, c)
			break
		case "test-jwt-message":
			valid, err := proconjwt.ValidateJWT(pr0config.PubKeyFile, in.Jwt)
			if err != nil {
				fmt.Println(err)
				procondata.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c)
			}
			if err == nil && valid {
				fmt.Println("VALID JWT")
			}
		case "create-user":
			fmt.Println(in.Data)
			usr, pwd, err := proconutil.B64DecodeTryUser(in.Data)
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println(string(usr), string(pwd))
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
