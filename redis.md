# Install redis


apt-get install redis-server
openssl rand 60 | openssl base64 -A
copy the output

32BLR2Vgvk0zh6hfP7ycmhgpnB2hKAqmW5TDhzEdkoAUQCZWjl6Xod0z26tAOeH6LvxolHMq4hfShd

sudo vi
sudo /etc/redis/redis.conf
add your ip to bind:
bind 127.0.0.1 your-ip-here
#requirepass foobared  < remove the # sign to uncomment and set active
replace foobared with long password you copied from output above
	-will look like the below
	
requirepass a0d8fa0df8as980df90ad809fa0s9dd8f0as8d09f8a0 for example
type> service redis stop
type> service redis start
check status with> service redis status

### Test 
auth password
