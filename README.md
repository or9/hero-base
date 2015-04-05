#Card Game  
Using Laravel for this simple app is like driving nails with a 20 lb sledgehammer. It's fulfilling and makes you strong.  

##Initial Setup
Create a new MySQL schema called `cards`. This will hold the application's tables.  
Create a user, `webapp` with all permissions (except grant privileges; they are not required) on the `cards` schema. This user does not require access to any other schemas.  
```
mv .env.example .env  
php artisan migrate  
php artisan db:seed  
php artisan serve
```

##Troubleshooting  
If composer is giving issues on Arch Linux...
```
sudo vim /usr/share/php-composer/php.ini
extension=mcrypt.so  
extension=pdo_mysql.so  
extension=pthreads.so  
extension_dir="/usr/lib/php/modules/"
```
