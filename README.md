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
npm install  
cp .env.example .env  
php artisan migrate  
php artisan db:seed  
```
###Start
```
php artisan serve
```
###Testing
```
grunt watch
```  
Laravel bootstraps the application with `elixer` so this can interfere with normal `gulp watch` style tasks. Solution is to put them into `elixer` configuration. First inclination is to delete `elixer`, but it's pretty cool. Instead of running all tasks, it will only run the relevant ones. For instance,  
```
elixir(function(mix) {
    mix.less('app.less');

    mix.task("karmaunit", ["public/**/*.js", "public/**/*.html"]);

    mix.task("phpunit", ["tests/**/*", "app/**/*.php", "resources/**/*"]);
});
```  
The above tasks will run their corresponding portions only. If Javascript or HTML is changed, `karma` will run unit tests; if PHP files and tests are changed, `phpunit` will run; and if styles are changed in their default Laravel pattern, the `less` task will run. This prevents the output from getting cluttered, and allows the most relevant tests or tasks to be seen easily.

##Troubleshooting  
###General  
`composer dump-autoload`  
Logging: `var_dump` or `print_r`  
Laravel will not load your provider files correctly. You _must_ do a `composer dump-autoload` as well as a `composer update` in order for it to load a new provider. Otherwise you'll be confused.

###Testing  
Using `this` rather than `$scope` can be problematic. It may work in browsers, but will break in PhantomJS in your tests. Maybe it's just that AngularJS isn't meant for testing. Possibly use `angular.bind`, e.g., `angular.bind(this, nextFn)`  
Resolution: use `MyCtrl as myctrl` and `scope.myctrl.prop` to test values.

###Mac
Issue: `Abort trap: 6`  
Resolution: Could be a conflict with a library, configuration, etc. Swiching from MariaDB to Oracle MySQL Community solved this issue but broke SSL.  
Issue: `brew` Updating PHP breaks plugin, e.x., `mcrypt, igbinary`  
Resolution: reinstall php[version]-[plugin] _from source_   
```
brew uninstall --force php56-mcrypt php56-igbinary  
brew install --build-from-source php56-mcrypt php56-igbinary
brew install php56 --with-thread-safety --with-postgresql php56-mcrypt --with-homebrew-php php56-igbinary --with-homebrew-php 
```

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
