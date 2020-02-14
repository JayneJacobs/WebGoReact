# Install mysql and phpmyadmin



## Install mysql
```sh
apt-get install mysql-server
mysql_secure_installation
n Validate Password
Password:
Password
Anonusese y
disable remot n
reload Y
  mysql_secure_installation
  mysql
type> mysql
```

### Test mysql

mysql 
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY "Nevermynd!23";
Query OK, 0 rows affected (0.01 sec)


### Install phpmyadmin

```sh

  cd pr0con.selfmanagedmusician.com/
  phpmyadmin
  wget https://files.phpmyadmin.net/phpMyAdmin/5.0.1/Admin-5.0.1-all-languages.zip
  ls
  unzip phpMyAdmin-5.0.1-all-languages.zip
  aptget install unzip
  clear
  ls
  mv phpMyAdmin-5.0.1-all-languages phpmyadmin
  rm phpMyAdmin-5.0.1-all-languages.zip
  ls

  apt install php curl php-cli php-mbstring git unzip php-fpm php-zip php-xml ysqlnd
  nginx -t
  service nginx reload
  ls
  mv phpmyadmin /var/www/parcel_blueprint/dist/
  cd pr0con.selfmanagedmusician.com/
  cd /var/www/parcel_blueprint/dist/
  ls
  cd /var/www/parcel_blueprint/dist
  ```
