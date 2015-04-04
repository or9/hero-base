##Troubleshooting  
If composer is giving issues on Arch Linux...
```
sudo vim /usr/share/php-composer/php.ini
extension=mcrypt.so  
extension=pdo_mysql.so  
extension=pthreads.so  
extension_dir="/usr/lib/php/modules/"
```
