 First Install mongodb

The following is a link to mongo's documents

[mongo tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu)

get the binary and install as follows: 

```sh
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```
