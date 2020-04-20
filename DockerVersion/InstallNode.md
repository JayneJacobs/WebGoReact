## Install Node
https://nodejs.org/en/download/current/

  ```sh
  cd /var/www
  wget https://nodejs.org/dist/v13.8.0/node-v13.8.0-linux-x64.tar.xz
  ls
  tar -xf node-v13.8.0-linux-x64.tar.xz node-v13.8.0-linux-x64/
  rm node-v13.8.0-linux-x64.tar.xz 
  mv node-v13.8.0-linux-x64/ node
  ln -s /var/www/parcel_blueprint/dist/node/bin/npm /usr/sbin/
  ln -s /var/www/parcel_blueprint/dist/node/bin/node /usr/sbin/
    ln -s /var/www/node/bin/npm /usr/sbin/
  ln -s /var/www/node/bin/node /usr/sbin/
  npm
  node
  ```