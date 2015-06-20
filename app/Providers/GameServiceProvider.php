<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GameService;
//use App;

class GameServiceProvider extends ServiceProvider {

	public function boot ()
	{
		// wtf
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{

		//return $this->app->instance("GameService", $gameService);

		// DO NOT use full namespace here

		$this->app->singleton("GameService", function ($app)
		{
			return new GameService;
		});

		//$this->app->singleton("GameService", new GameService);

	}

}
