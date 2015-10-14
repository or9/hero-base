#Testing  
##AJAX Request  
Sometimes, instead of requesting a view, you may want your test make an AJAX request to a route. For instance, if you have an API which is only expecting AJAX requests, you might want to instruct your tests to pass the appropriate headers along with the request.
```
$server = array('HTTP_X-Requested-With' => 'XMLHttpRequest');  
$this->call('get', '/ajax-route', array(), array(), $server);
```
Refer to (Andreas' answer on Stackoverflow)[http://stackoverflow.com/questions/20093897/how-to-simulate-xmlhttprequests-in-a-laravel-testcase]  

##Database  
When using the DatabaseMigrations class, the table modified by the tests will be deleted after each run.  
