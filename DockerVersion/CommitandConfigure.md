apt-get install nginx
apt install php curl php-cli php-mbstring git unzip php-fpm php-zip php-xml php-mysqlnd
rm -rf /var/www/html
cd /etc/nginx/sites-available 
rm default
touch yourdomain.com
cd /etc/nginx/sites-enabled
rm default
cd /etc/nginx/sites-available
edit yourdomain.com  <-- created at /etc/nginx/sites-available
=======================Copy Below
server {
    listen 80;
    listen [::]:80;
    server_name yoursite.com
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name yoursite.com;
    ssl_certificate /etc/letsencrypt/live/yoursite.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yoursite.com/privkey.pem;
    root /var/www/parcel_blueprint/dist;
    index index.php index.html index.htm;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    }
    location ~ /\.ht {
    	deny all;
    }
}
==================Copy above
once done editing continue...
type> nginx -t 
type> ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
type> nginx reload


