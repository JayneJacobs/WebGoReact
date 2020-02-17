
# Use the following proceedure to set up NGINX

```sh

cd /var/www
ls
rm -rf html
ls
cd /etc/nginx
history
```

Set up ```[nginx/sites-available/<sitename>](sitename)```

```sh
/var/www# mkdir parcel_blueprint

root@gopherclub:/var/www# ln -s /var/www/mkdir parcel_blueprint /etc/nginx/sites-available/pr0con.selfmanagedmusician.com /etc/nginx/sites-enabled/

sudo -H ./letsencrypt-auto certonly --standalone -d pr0con.selfmanagedmusician.com -d www.pr0con.selfmanagedmusician.com

root@gopherclub:#
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator standalone, Installer None
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for www.pr0con.selfmanagedmusician.com
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/pr0con.selfmanagedmusician.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/pr0con.selfmanagedmusician.com/privkey.pem
   Your cert will expire on 2020-04-29. To obtain a new or tweaked
   version of this certificate in the future, simply run
   letsencrypt-auto again. To non-interactively renew *all* of your
   certificates, run "letsencrypt-auto renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le

root@gopherclub:/opt/letsencrypt# cd /etc/letsencrypt/

root@gopherclub:/etc/letsencrypt# cd live/
root@gopherclub:/etc/letsencrypt/live# ls
gopherclub.jaynejacobs.com  gopherface.jaynejacobs.com  pr0con.selfmanagedmusician.com  README
root@gopherclub:/etc/letsencrypt/live# cd pr0con.selfmanagedmusician.com/
root@gopherclub:/etc/letsencrypt/live/pr0con.selfmanagedmusician.com# ls
cert.pem  chain.pem  fullchain.pem  privkey.pem  README
root@gopherclub:/etc/letsencrypt/live/pr0con.selfmanagedmusician.com# ls -la
total 12
drwxr-xr-x 2 root root 4096 Jan 30 17:38 .
drwx------ 5 root root 4096 Jan 30 17:38 ..
lrwxrwxrwx 1 root root   54 Jan 30 17:38 cert.pem -> ../../archive/pr0con.selfmanagedmusician.com/cert1.pem
lrwxrwxrwx 1 root root   55 Jan 30 17:38 chain.pem -> ../../archive/pr0con.selfmanagedmusician.com/chain1.pem
lrwxrwxrwx 1 root root   59 Jan 30 17:38 fullchain.pem -> ../../archive/pr0con.selfmanagedmusician.com/fullchain1.pem
lrwxrwxrwx 1 root root   57 Jan 30 17:38 privkey.pem -> ../../archive/pr0con.selfmanagedmusician.com/privkey1.pem
-rw-r--r-- 1 root root  692 Jan 30 17:38 README
root@gopherclub:/etc/letsencrypt/live/pr0con.selfmanagedmusician.com# cd /var/www/parcel_blueprint/
root@gopherclub:/var/www/parcel_blueprint# ls
root@gopherclub:/var/www/parcel_blueprint# mkdir dist
root@gopherclub:/var/www/parcel_blueprint# cd dist
root@gopherclub:/var/www/parcel_blueprint/dist# touch index.html
root@gopherclub:/var/www/parcel_blueprint/dist# vi index.html
root@gopherclub:/var/www/parcel_blueprint/dist# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

I looked at /etc/nginx.conf and had to comment out this line
```#include /etc/nginx/sites-enabled/*;```
Then I used ```nginx -t``` and it passed
Now its running just fine

```sh
● nginx.service - A high performance web server and a reverse proxy server
Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
Active: active (running) since Sun 2020-02-02 22:48:04 UTC; 8s ago
```

Jayne Jacobs Also somehow apache was running Apache/2.4.29 (Ubuntu) Server at pr0con.selfmanagedmusician.com Port 80
Edit or delete this
PR0CON.SELFMANAGEDMUSICIAN.COM
404 Not Found
**
journalctl -xe
service nginx status
service nginx stop
nginx -t
service nginx start
journalctl -xe
service nginx stop
netstat | grep 80
/etc/init.d/apache2 stop
service nginx start
