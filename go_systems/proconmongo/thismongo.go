package proconmongo

import (
	"context"
	"encoding/json"
	"fmt"
	"go_systems/pr0config"
	"go_systems/procondata"
	"go_systems/proconutil"

	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type key string

const (
	// HostKey string
	HostKey = key("hostKey")
	// UsernameKey string
	UsernameKey = key("usernameKey")
	// PasswordKey string
	PasswordKey = key("passwordKey")
	// DatabaseKey string
	DatabaseKey = key("databaseKey")
)

var ctx context.Context
var client mongo.Client
var cancel func()

func init() {

	ctx = context.Background()
	ctx, cancel = context.WithCancel(ctx)
	defer cancel()
	ctx = context.WithValue(ctx, HostKey, pr0config.MongoHost)
	ctx = context.WithValue(ctx, UsernameKey, pr0config.MongoUser)
	ctx = context.WithValue(ctx, UsernameKey, pr0config.MongoPassword)
	ctx = context.WithValue(ctx, UsernameKey, pr0config.MongoDb)

	uri := fmt.Sprint(`mongodb://%s:%s@%s/%s`,
		ctx.Value(UsernameKey).(string),
		ctx.Value(PasswordKey).(string),
		ctx.Value(UsernameKey).(string),
		ctx.Value(UsernameKey).(string),
	)
	clientoptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(ctx, clientoptions)

	if err != nil {
		fmt.Println(err)
	}

	err := client.Ping(ctx,nil)

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Mongo Connected")

}
// CreateUser takes a create_user string and returns a status bool
func CreateUser(json_create_user string, ws *websocket.Conn) bool {
	user := procondata.AUser{}
	err := json.Unmarshal([]byte(json_create_user), &user)
	if err != nil  {
		fmt.Println("CreateUserin thismongo", err)
	}
	collection := client.Database("api").Collection("users")

	//Check for a user
    var xdoc interface{}
    filter := bson.D{{"user", user.User}}
    err = collection.FindOne(ctx, filter).Decode(&xdoc)
    if err != nil{ 
	    if xdoc == nil {
			fmt.Println("User available", err)
			hp := proconutil.GenerateUserPassword(user.Password)
			user.Password = hp
			user.Role = "Adminitrator"
			insertResult, err := collection.InsertOne(ctx,&user )
		    if err != nil {
					fmt.Println("Error Inserting Document")
					return false
				}
			fmt.Println("Inserted User: ", insertResult.InsertedID)
			procondata.SendMsg("vAr","toast-success", "user created successfully", ws)
			return true
			}
			procondata.SendMsg("vAr","rapid-test-user-avail-fail", "User Alread Exists", ws)
			return false
		}
		return false
}