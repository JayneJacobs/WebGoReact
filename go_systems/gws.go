package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"go_systems/pr0config"
	"go_systems/procondata"
	"go_systems/proconjwt"
	"go_systems/proconmongo"
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
		fmt.Println(&in)
		err := c.ReadJSON(&in)
		if err != nil {
			fmt.Println("In Loop Error in ReadJson", in.Data, err)
			c.Close()
			break Loop
		}
		fmt.Println(in.Type)
		switch in.Type {
		case "register-client-msg":
			procondata.SendMsg("^vAr^", "server-ws-connect-success-msg", c.UUID, c)
			break
		case "test-jwt-message":
			valid, err := proconjwt.ValidateJWT(pr0config.PubKeyFile, in.Jwt)
			if err != nil {
				fmt.Println("Error in gws case test-jwt-message", err)
				procondata.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c)
				break
			}
			if err == nil && valid {
				fmt.Println("VALID JWT")
				break
			}
		case "create-user":
			res := proconmongo.CreateUser(in.Data, c)
			fmt.Println("Mongo Function Result: ", res)
			break
		case "login-user":
			usr, pwd, err := proconutil.B64DecodeTryUser(in.Data)
			if err != nil {
				fmt.Println("Error in gws proconutil.B64DecodeTryUser", err)
				break
			}
			vres, auser, err := proconmongo.MongoTryUser(usr, pwd)
			if err != nil {
				fmt.Println("Error in gws  case proconmongo.MongoTryUser", err)
				break
			}
			fmt.Println(vres, auser)
			if vres == true {
				auser.Password = "F00"
				fmt.Println(auser)
				jauser, err := json.Marshal(auser)
				if err != nil {
					fmt.Println("Error in gws switch login-user", err)
				}
				jwt, err := proconjwt.GenerateJWT(pr0config.PrivKeyFile, auser.Name, "@"+auser.Name, auser.Email, auser.Role)
				if err != nil {
					fmt.Println("JWT Generate error in gws.go switch case login-user", err)
					break
				}
				procondata.SendMsg(jwt, "server-ws-connect-success-jwt", string(jauser), c)
				
				break
			}
			procondata.SendMsg("^vAr^", "server-ws-connect-login-failure", "User not found or invalid credentials", c)
			fmt.Println("User Not found or invalid credentials")
			break
		case "validate-jwt":
			valid, err := proconjwt.ValidateJWT(pr0config.PubKeyFile, in.Jwt)
			if err != nil {
				fmt.Println("Error in gws case test-jwt-message", err)
				procondata.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c)
				break
			}
			if err == nil && valid {
				fmt.Println("VALID JWT")
				break
			}
		default:
			fmt.Println("Default case: No switch statemens in gws true")
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
