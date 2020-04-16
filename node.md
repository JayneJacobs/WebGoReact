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

## Setup npm

in /var/www/parcel_blueprint/
npm init -y

creates package.json

npm install parcel-bundler --save
npm install --save @babel/core
npm install --save @babel/plugin-proposal-class-properties
npm install --save @babel/plugin-transform-runtime 
npm install --save react react-dom
				
mkdir src
cd /var/www/parcel_blueprint   
	-OR src depending on what directory your in	
				
touch index.html <-- in src directory
mkdir Components
mkdir fonts
mkdir css
cd /var/www/parcel_blueprint 
touch .babelrc
	-make sure you have the . in front of the filename
	
sudo vi .babelrc
type> i 
	- to insert
{
	"plugins": ["@babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"]
}
cd /var/www/parcel_blueprint 
	-just to be sure
				
touch index.html <-- in src directory
mkdir Components
mkdir fonts
mkdir css
cd /var/www/parcel_blueprint 
touch .babelrc
	-make sure you have the . in front of the filename
	
sudo vi .babelrc
type> i 
	- to insert
{
	"plugins": ["@babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"]
}

hit escape, then hold shift and hit : 
type> wq
then enter  ,, to save

/var/www/parcel_blueprint# npm install --save @babel/core

npm install parcel-bundler --save

root@pr0con:/var/www/parcel_blueprint/dist# rm -f /usr/sbin/npm /usr/sbin/node /usr/sbin/pm2
root@pr0con:/var/www/parcel_blueprint/dist# ln -s /var/www/node/bin/node /usr/sbin/
root@pr0con:/var/www/parcel_blueprint/dist#  ln -s /var/www/node/bin/npm /usr/sbin/
root@pr0con:/var/www/parcel_blueprint/dist# ln -s /var/www/node/bin/pm2 /usr/sbin/

npm run start
