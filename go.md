# Installing Go

https://golang.org/dl/

```sh
cd /var/www/

wget https://dl.google.com/go/go1.13.7.linux-amd64.tar.gz

tar -xf go1.13.7.linux-amd64.tar.gz

ln -s /var/www/go/bin/go /usr/sbin
```

build [go program](parcel_blueprint/dist/gws.go)
go guild gws.go
./gws

chmod +x gws


go get github.com/gorilla/mux
go get github.com/websocket

go run .

netstat -l

 netstat -l | grep 1200