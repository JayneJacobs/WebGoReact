package proconutil

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"go_systems/procondata"

	"golang.org/x/crypto/bcrypt"
)

//B64DecodeTryUser take a test user string and returns 64 bit encoded email and password and error
func B64DecodeTryUser(test_user_json_str string) ([]byte, []byte, error) {
	var tu procondata.TryUser
	err := json.Unmarshal([]byte(test_user_json_str), &tu)
	if err != nil {
		return nil, nil, err
	}
	tuUsDec, _ := b64.StdEncoding.DecodeString(string(tu.Email))
	tuPsDec, _ := b64.StdEncoding.DecodeString(string(tu.Password))

	return tuUsDec, tuPsDec, nil

}

// GenerateUserPassword takes pwdstr string ane returns 64bit encoded string
func GenerateUserPassword(pwdstr string) string {
	hp, err := bcrypt.GenerateFromPassword([]byte(pwdstr), 0)
	if err != nil {
		fmt.Printf("Generate BCrypt Error: %s", err)
	}
	return string(hp)
}