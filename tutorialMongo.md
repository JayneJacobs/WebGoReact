# First Install mongodb

The following is a link to mongo's documents

[mongo tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu)

get the binary and install as follows: 

```sh
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### Configure mongodb

The following are the steps to add addressing

```sh
ifconfig

ens192: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet ###.###.##.##  netmask 255.255.255.255  broadcast 1##.###.##.##
```

```sh
root@pr0con:~# vi /etc/mongod.conf 
root@pr0con:~# service mongodb start
Failed to start mongodb.service: Unit mongodb.service not found.
root@pr0con:~# service mongod start
root@pr0con:~# service mongod status
● mongod.service - MongoDB Database Server
   Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-02-03 00:19:03 UTC; 9s ago
     Docs: https://docs.mongodb.org/manual
 Main PID: 2522 (mongod)
   CGroup: /system.slice/mongod.service
           └─2522 /usr/bin/mongod --config /etc/mongod.conf
```

This is the step to add a useer to the admin db.  

```mongo
> use admin
switched to db admin
> db.createUser({
     user: "mongod",
     pwd: "ThisPassword",
     roles: [
               { role: "userAdminAnyDatabase", db: "admin" },
               { role: "readWriteAnyDatabase", db: "admin" },
               { role: "dbAdminAnyDatabase", db: "admin"},
               { role: "clusterAdmin", db: "admin" }
            ]
 })
Su>
```

```vi /etc/mongod.conf```

### Add the following

security:
  authorization: enabled

```sh
sudo vi /etc/mongod.conf
net:
  port: 27017
  bindIp: 127.0.0.1,yourip
```

security:
  authorization: enabled

```sh
sudo vi /lib/systemd/system/mongod.service
ExecStart=/usr/bin/mongod --auth --config /etc/mongod.conf
service mongod restart
systemctl daemon-reload
service mongod restart�
service mongod status
```

**Note:** had errors until I rebooted

Log into Robo 3T

## [Summary:](https://www.udemy.com/course/golang-react-w-node-mongo-redis-mysql-nginx/learn/lecture/16809166#questions/9316556)

Okay i still forget to do that to this day.. a couple of tricks i picked up are

1. disabling the security from /etc/mongod.confg and removing --auth from /lib/systemd/system/mongod.service

2. login to mongo shell and > db.getName()    to show what the current database is i think test,

3. change the authentication tab in robo3t to use that ,, then try your user name and password.

### Method two

1. disable security

2. login

3. type> use admin

4. Create a new user and password

5. connect  find / remove other user
