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
	ctx = context.WithValue(ctx, PasswordKey, pr0config.MongoPassword)
	ctx = context.WithValue(ctx, DatabaseKey, pr0config.MongoDb)

	uri := fmt.Sprintf(`mongodb://%s:%s@%s/%s`,
		ctx.Value(UsernameKey).(string),
		ctx.Value(PasswordKey).(string),
		ctx.Value(HostKey).(string),
		ctx.Value(DatabaseKey).(string),
	)

	clientoptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(ctx, clientoptions)

	if err != nil {
		fmt.Println(err)
	}

	err = client.Ping(ctx, nil)

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Mongo Connected")

}

// CreateUser takes a create_user string and returns a status bool
func CreateUser(jsonCreateuser string, ws *websocket.Conn) bool {
	user := procondata.AUser{}
	err := json.Unmarshal([]byte(jsonCreateuser), &user)
	if err != nil {
		fmt.Println("CreateUserin thismongo", err)
	}
	usr, pwd, err := proconutil.B64DecodeTryUser(jsonCreateuser)
	if err != nil {
		fmt.Println(err)
	}

	user.Email = string(usr)
	user.Password = string(pwd)

	collection := client.Database("api").Collection("users")

	//Check for a user
	var xdoc interface{}
	fmt.Println(string(usr), string(pwd))
	filter := bson.D{{"user", user.Email}}
	err = collection.FindOne(ctx, filter).Decode(&xdoc)
	if err != nil {
		if xdoc == nil {
			fmt.Println("User available", err)
			hp := proconutil.GenerateUserPassword(user.Password)
			user.Password = hp
			user.Role = "Generic"
			insertResult, err := collection.InsertOne(ctx, &user)
			if err != nil {
				fmt.Println("Error Inserting Document")
				return false
			}
			fmt.Println("Inserted User: ", insertResult.InsertedID)
			procondata.SendMsg("vAr", "toast-success", "user created successfully", ws)
			return true
		}
		proconutil.SendMsg("vAr", "rapid-test-user-avail-fail", "User Alread Exists", ws)
		return false
	}
	return false
}

// MongoTryUser takes a username and password as a slice of bytes and returns bbool and Userstruct and error
func MongoTryUser(u []byte, p []byte) (bool, *procondata.AUser, error) {
	var xdoc procondata.AUser
	collection := client.Database("api").Collection("users")
	filter := bson.D{{"email", string(u)}}
	if err := collection.FindOne(ctx, filter).Decode(&xdoc); err != nil {
		return false, nil, bson.ErrDecodeToNil
	}
	bres, err := proconutil.ValidateUserPassword(p, []byte(xdoc.Password))
	if err != nil {
		return false, nil, err
	}
	return bres, &xdoc, nil
}
