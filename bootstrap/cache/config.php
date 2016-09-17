<?php return array (
  'app' => 
  array (
    'env' => 'local',
    'debug' => true,
    'url' => 'http://localhost',
    'timezone' => 'UTC',
    'locale' => 'en',
    'fallback_locale' => 'en',
    'key' => '1jAeRhq9JQFUh7bJUyveOQnnrd7zQvJu',
    'cipher' => 'rijndael-128',
    'log' => 'daily',
    'providers' => 
    array (
      0 => 'Illuminate\\Auth\\AuthServiceProvider',
      1 => 'Illuminate\\Cache\\CacheServiceProvider',
      2 => 'Illuminate\\Foundation\\Providers\\ConsoleSupportServiceProvider',
      3 => 'Illuminate\\Cookie\\CookieServiceProvider',
      4 => 'Illuminate\\Database\\DatabaseServiceProvider',
      5 => 'Illuminate\\Encryption\\EncryptionServiceProvider',
      6 => 'Illuminate\\Filesystem\\FilesystemServiceProvider',
      7 => 'Illuminate\\Foundation\\Providers\\FoundationServiceProvider',
      8 => 'Illuminate\\Hashing\\HashServiceProvider',
      9 => 'Illuminate\\Mail\\MailServiceProvider',
      10 => 'Illuminate\\Pagination\\PaginationServiceProvider',
      11 => 'Illuminate\\Pipeline\\PipelineServiceProvider',
      12 => 'Illuminate\\Queue\\QueueServiceProvider',
      13 => 'Illuminate\\Redis\\RedisServiceProvider',
      14 => 'Illuminate\\Auth\\Passwords\\PasswordResetServiceProvider',
      15 => 'Illuminate\\Session\\SessionServiceProvider',
      16 => 'Illuminate\\Translation\\TranslationServiceProvider',
      17 => 'Illuminate\\Validation\\ValidationServiceProvider',
      18 => 'Illuminate\\View\\ViewServiceProvider',
      19 => 'Illuminate\\Broadcasting\\BroadcastServiceProvider',
      20 => 'App\\Providers\\AppServiceProvider',
      21 => 'App\\Providers\\ConfigServiceProvider',
      22 => 'App\\Providers\\EventServiceProvider',
      23 => 'App\\Providers\\RouteServiceProvider',
      24 => 'App\\Providers\\GameServiceProvider',
    ),
    'aliases' => 
    array (
      'App' => 'Illuminate\\Support\\Facades\\App',
      'Artisan' => 'Illuminate\\Support\\Facades\\Artisan',
      'Auth' => 'Illuminate\\Support\\Facades\\Auth',
      'Blade' => 'Illuminate\\Support\\Facades\\Blade',
      'Bus' => 'Illuminate\\Support\\Facades\\Bus',
      'Cache' => 'Illuminate\\Support\\Facades\\Cache',
      'Config' => 'Illuminate\\Support\\Facades\\Config',
      'Cookie' => 'Illuminate\\Support\\Facades\\Cookie',
      'Crypt' => 'Illuminate\\Support\\Facades\\Crypt',
      'DB' => 'Illuminate\\Support\\Facades\\DB',
      'Eloquent' => 'Illuminate\\Database\\Eloquent\\Model',
      'Event' => 'Illuminate\\Support\\Facades\\Event',
      'File' => 'Illuminate\\Support\\Facades\\File',
      'Hash' => 'Illuminate\\Support\\Facades\\Hash',
      'Input' => 'Illuminate\\Support\\Facades\\Input',
      'Inspiring' => 'Illuminate\\Foundation\\Inspiring',
      'Lang' => 'Illuminate\\Support\\Facades\\Lang',
      'Log' => 'Illuminate\\Support\\Facades\\Log',
      'Mail' => 'Illuminate\\Support\\Facades\\Mail',
      'Password' => 'Illuminate\\Support\\Facades\\Password',
      'Queue' => 'Illuminate\\Support\\Facades\\Queue',
      'Redirect' => 'Illuminate\\Support\\Facades\\Redirect',
      'Redis' => 'Illuminate\\Support\\Facades\\Redis',
      'Request' => 'Illuminate\\Support\\Facades\\Request',
      'Response' => 'Illuminate\\Support\\Facades\\Response',
      'Route' => 'Illuminate\\Support\\Facades\\Route',
      'Schema' => 'Illuminate\\Support\\Facades\\Schema',
      'Session' => 'Illuminate\\Support\\Facades\\Session',
      'Storage' => 'Illuminate\\Support\\Facades\\Storage',
      'URL' => 'Illuminate\\Support\\Facades\\URL',
      'Validator' => 'Illuminate\\Support\\Facades\\Validator',
      'View' => 'Illuminate\\Support\\Facades\\View',
    ),
  ),
  'auth' => 
  array (
    'defaults' => 
    array (
      'guard' => 'web',
      'passwords' => 'users',
    ),
    'guards' => 
    array (
      'web' => 
      array (
        'driver' => 'session',
        'provider' => 'users',
      ),
      'api' => 
      array (
        'driver' => 'token',
        'provider' => 'users',
      ),
    ),
    'providers' => 
    array (
      'users' => 
      array (
        'driver' => 'eloquent',
        'model' => 'App\\User',
      ),
    ),
    'passwords' => 
    array (
      'users' => 
      array (
        'provider' => 'users',
        'table' => 'password_resets',
        'expire' => 60,
      ),
    ),
  ),
  'cache' => 
  array (
    'default' => 'file',
    'stores' => 
    array (
      'apc' => 
      array (
        'driver' => 'apc',
      ),
      'array' => 
      array (
        'driver' => 'array',
      ),
      'database' => 
      array (
        'driver' => 'database',
        'table' => 'cache',
        'connection' => NULL,
      ),
      'file' => 
      array (
        'driver' => 'file',
        'path' => '/Users/xf0x/Documents/or9/hero-flashcards/storage/framework/cache',
      ),
      'memcached' => 
      array (
        'driver' => 'memcached',
        'servers' => 
        array (
          0 => 
          array (
            'host' => '127.0.0.1',
            'port' => 11211,
            'weight' => 100,
          ),
        ),
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'connection' => 'default',
      ),
    ),
    'prefix' => 'laravel',
  ),
  'compile' => 
  array (
    'files' => 
    array (
      0 => '/Users/xf0x/Documents/or9/hero-flashcards/app/Providers/AppServiceProvider.php',
      1 => '/Users/xf0x/Documents/or9/hero-flashcards/app/Providers/EventServiceProvider.php',
      2 => '/Users/xf0x/Documents/or9/hero-flashcards/app/Providers/RouteServiceProvider.php',
    ),
    'providers' => 
    array (
    ),
  ),
  'database' => 
  array (
    'fetch' => 8,
    'default' => 'mysql',
    'connections' => 
    array (
      'sqlite' => 
      array (
        'driver' => 'sqlite',
        'database' => '/Users/xf0x/Documents/or9/hero-flashcards/storage/database.sqlite',
        'prefix' => '',
      ),
      'mysql' => 
      array (
        'driver' => 'mysql',
        'host' => 'localhost',
        'database' => 'cards',
        'username' => 'webapp',
        'password' => 'test!234',
        'charset' => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix' => '',
        'strict' => false,
      ),
      'pgsql' => 
      array (
        'driver' => 'pgsql',
        'host' => 'localhost',
        'database' => 'cards',
        'username' => 'webapp',
        'password' => 'test!234',
        'charset' => 'utf8',
        'prefix' => '',
        'schema' => 'public',
      ),
      'sqlsrv' => 
      array (
        'driver' => 'sqlsrv',
        'host' => 'localhost',
        'database' => 'cards',
        'username' => 'webapp',
        'password' => 'test!234',
        'prefix' => '',
      ),
    ),
    'migrations' => 'migrations',
    'redis' => 
    array (
      'cluster' => false,
      'default' => 
      array (
        'host' => '127.0.0.1',
        'port' => 6379,
        'database' => 0,
      ),
    ),
  ),
  'filesystems' => 
  array (
    'default' => 'local',
    'cloud' => 's3',
    'disks' => 
    array (
      'local' => 
      array (
        'driver' => 'local',
        'root' => '/Users/xf0x/Documents/or9/hero-flashcards/storage/app',
      ),
      's3' => 
      array (
        'driver' => 's3',
        'key' => 'your-key',
        'secret' => 'your-secret',
        'region' => 'your-region',
        'bucket' => 'your-bucket',
      ),
      'rackspace' => 
      array (
        'driver' => 'rackspace',
        'username' => 'your-username',
        'key' => 'your-key',
        'container' => 'your-container',
        'endpoint' => 'https://identity.api.rackspacecloud.com/v2.0/',
        'region' => 'IAD',
        'url_type' => 'publicURL',
      ),
    ),
  ),
  'mail' => 
  array (
    'driver' => 'smtp',
    'host' => 'mailtrap.io',
    'port' => '2525',
    'from' => 
    array (
      'address' => NULL,
      'name' => NULL,
    ),
    'encryption' => 'tls',
    'username' => NULL,
    'password' => NULL,
    'sendmail' => '/usr/sbin/sendmail -bs',
    'pretend' => false,
  ),
  'queue' => 
  array (
    'default' => 'sync',
    'connections' => 
    array (
      'sync' => 
      array (
        'driver' => 'sync',
      ),
      'database' => 
      array (
        'driver' => 'database',
        'table' => 'jobs',
        'queue' => 'default',
        'expire' => 60,
      ),
      'beanstalkd' => 
      array (
        'driver' => 'beanstalkd',
        'host' => 'localhost',
        'queue' => 'default',
        'ttr' => 60,
      ),
      'sqs' => 
      array (
        'driver' => 'sqs',
        'key' => 'your-public-key',
        'secret' => 'your-secret-key',
        'queue' => 'your-queue-url',
        'region' => 'us-east-1',
      ),
      'iron' => 
      array (
        'driver' => 'iron',
        'host' => 'mq-aws-us-east-1.iron.io',
        'token' => 'your-token',
        'project' => 'your-project-id',
        'queue' => 'your-queue-name',
        'encrypt' => true,
      ),
      'redis' => 
      array (
        'driver' => 'redis',
        'queue' => 'default',
        'expire' => 60,
      ),
    ),
    'failed' => 
    array (
      'database' => 'mysql',
      'table' => 'failed_jobs',
    ),
  ),
  'services' => 
  array (
    'mailgun' => 
    array (
      'domain' => '',
      'secret' => '',
    ),
    'mandrill' => 
    array (
      'secret' => '',
    ),
    'ses' => 
    array (
      'key' => '',
      'secret' => '',
      'region' => 'us-east-1',
    ),
    'stripe' => 
    array (
      'model' => 'User',
      'secret' => '',
    ),
  ),
  'session' => 
  array (
    'driver' => 'file',
    'lifetime' => 120,
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => '/Users/xf0x/Documents/or9/hero-flashcards/storage/framework/sessions',
    'connection' => NULL,
    'table' => 'sessions',
    'lottery' => 
    array (
      0 => 2,
      1 => 100,
    ),
    'cookie' => 'laravel_session',
    'path' => '/',
    'domain' => NULL,
    'secure' => false,
  ),
  'view' => 
  array (
    'paths' => 
    array (
      0 => '/Users/xf0x/Documents/or9/hero-flashcards/resources/views',
    ),
    'compiled' => '/Users/xf0x/Documents/or9/hero-flashcards/storage/framework/views',
  ),
);
