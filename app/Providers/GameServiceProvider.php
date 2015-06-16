<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GameService;

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
		// DO NOT use full namespace here
		$this->app->singleton("GameService", function ($app)
		{
			return new GameService();
		});

		//$gameService = new GameService();

		//$this->app->instance("GameService", $gameService);
	}

}
