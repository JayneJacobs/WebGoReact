#Installing Go

wget https://dl.google.com/go/go1.13.7.linux-amd64.tar.gz

tar -xf go1.13.7.linux-amd64.tar.gz

ln -s /var/www/go/bin/go /usr/sbin

mkdir go_systems

touch main.go  
mkdir src
cd src

service ssh start

put GOPATH and GOBIN in ~/.bash_profile

create main.go in /src