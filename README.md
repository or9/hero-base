#Card Game  
Using Laravel for this simple app is like driving nails with a 20 lb sledgehammer. It's fulfilling and makes you strong.  

##Required Software
* PHP  
* Composer  
* Laravel  
* Database (MariaDB / MySQL)
* NodeJS  
* Bower  `npm install -g bower`  
* karma-cli  `npm install -g karma-cli`  

##Initial Setup
### SSL
In order to successfully use an SSL setup, you may wish to use MariaDB rather than MySQL for local development.  
Create SSL certs following this guide, https://dev.mysql.com/doc/refman/5.0/en/creating-ssl-certs.html  
### Tables
Create a new MySQL schema called `cards`. This will hold the application's tables.  
Create a user, `webapp` with all permissions (except grant privileges; they are not required) on the `cards` schema. This user does not require access to any other schemas.  
```
composer install
composer update
cp .env.example .env  
php artisan migrate  
php artisan db:seed  
```
###Start
```
php artisan serve
```

##Troubleshooting  
###General  
`composer dump-autoload`  

###Mac
Issue: `Abort trap: 6`  
Resolution: Could be a conflict with a library, configuration, etc. Swiching from MariaDB to Oracle MySQL Community solved this issue but broke SSL.  

###Windows
Issue: "Windows sucks".
Resolution: Invest in Linux  

###Arch Linux...
Issue: Composer uses a separate php.ini, so if it fails `install` or `update` due to missing libraries, enable extensions in `Composer`'s own php.ini  
```
sudo vim /usr/share/php-composer/php.ini
extension=mcrypt.so  
extension=pdo_mysql.so  
extension=pthreads.so  
extension_dir="/usr/lib/php/modules/"
```
…
