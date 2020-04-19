Docker version of Pr0con


https://docs.docker.com/engine/install/ubuntu/

$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

 https://github.com/docker/for-linux/issues/833

 sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   disco \
   stable"

   sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io

b. Install a specific version using the version string from the second column, for example, 5:18.09.1~3-0~ubuntu-xenial.

export VERSION_STRING=5:18.09.1~3-0~ubuntu-xenial
sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io
Verify that Docker Engine is installed correctly by running the hello-world image.

$ sudo docker run hello-world


## Install Docker Machine

 base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo mv /tmp/docker-machine /usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine

## Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose



#Setting up Docker
Digital Ocean  SSL CErt](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04)

docker pull ubuntu:19.04
docker login
docker image tag ubuntu:19.04 YOURUSERNAME/ubuntu
docker container run -it YOURUSERNAME/ubuntu
apt-get update
apt-get install openssl
openssl req -x509 -days 365 -nodes -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
apt-get install vim
apt-get install ssh
	-vi /etc/ssh/sshd_config	change port etc...
	-apt-get install php curl php-cli php-mbstring git unzip php-fpm php-zip php-xml php-mysqlnd
	
	
apt-get install wget
apt-get install unzip
openssl req -x509 -days 365 -nodes -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
apt-get install nginx
cd /etc/nginx/sites-available/
rm default
cd ../sites-enabled/
ls
touch xbin.pr0con.com
add the following: 

server {
    listen 80;
    listen [::]:80;
    server_name ghost.pr0con.com;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name  ghost.pr0con.com;
	add_header Cache-Control no-cache;
	ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
	ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
    root /var/www/parcel_blueprint/dist;
    index index.php index.html index.htm;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
	error_page 404 /index.html;
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    }
    location ~ /\.ht {
            deny all;
    }
}

made the directories parcel_blueprint/dist wget phpmyadmin,
ln -s /etc/nginx/sites-available/xbin/.pr0con.com /etc/nginx/sites-enabled/

nginx -t
cd /var/www 
mkdir parcel_blueprint
touch index.html
vi index.html
service nginx start
docker ps -a
docker container ls -a

docker commit id pr0con2Jayne/ubuntu



service php7.2-fpm start
	-SHIT WORKED...
service redis-server start
@THIS POINT MYSQL IS WORKING / NGINX / PHPMYADMIN && REDIS
******>>>>> 
trying mongod: make /var/www/mongodb.log  REMOVE 127.0.0.1 from /etc/mongod.conf <-----******
mongod --fork --logpath /var/www/mongod.log   --config /etc/mongo.conf --auth
@xbin>mongod --fork --logpath /var/www/mongod.log   --config /var/www/mongo.conf --auth
	-MONGO WORKING @THIS Point

db.createUser({
    user: "mongod",
    pwd: "SOMEHARDPASSWORD",
    roles: [
              { role: "userAdminAnyDatabase", db: "admin" },
              { role: "readWriteAnyDatabase", db: "admin" },
              { role: "dbAdminAnyDatabase", db: "admin"},
              { role: "clusterAdmin", db: "admin" }
           ]
})

LAST) docker run -dit -p 80:80 -p 443:443 -p 4242:4242 -p 3306:3306 -p 9000:9000 -p 27017:27017 JayneJacobs/ubuntu 

docker container ls
REATTACH) docker attach 
OR> docker run -it -p 80:80 -p 443:443 -p 4242:4242 -p 3306:3306 -p 9000:9000 -p 27017:27017 JayneJacobs/ubuntu 
apt-get install mysql-server
mysql_secure_installation
alter user 'root'@'localhost' identified with mysql_native_password by "ThisPassword";

### phpmyadmin

```sh
wget https://files.phpmyadmin.net/phpMyAdmin/5.0.1/phpMyAdmin-5.0.1-all-languages.zip
ls
unzip phpMyAdmin-5.0.1-all-languages.zip
aptget install unzip
clear
ls
mv phpMyAdmin-5.0.1-all-languages phpmyadmin
rm phpMyAdmin-5.0.1-all-languages.zip
ls


apt install php curl php-cli php-mbstring git unzip php-fpm php-zip php-xml php-mysqlnd
```

PART II CREATION A COPY OF WORKING!!!
docker image tag  JayneJacobs/ubuntu jaynejacobs/testing
docker push pr0con/testing
docker run -it -p 80:80 -p 443:443 -p 4242:4242 -p 3306:3306 -p 9000:9000 -p 27017:27017 -p 1234:1234 -p 5000:5000 -p 6379:6379 pr0con/testing
docker run -dit -p 80:80 -p 443:443 -p 4242:4242 -p 3306:3306 -p 9000:9000 -p 27017:27017 -p 1234:1234 -p 5000:5000 -p 6379:6379 pr0con/testing
//Testing has node and go now NEXT MAYBE https://stackoverflow.com/questions/12973777/how-to-run-a-shell-script-at-startup
	service ssh start
	service php7.2-fpm start
	service nginx start
	service redis-server start
	service mysql start
	mongod --fork --logpath /var/www/mongod.log   --config /etc/mongod.conf --auth
