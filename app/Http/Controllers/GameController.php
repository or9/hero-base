<?php namespace App\Http\Controllers;

use DB;
use App\Services\GameService;
use App;
//use Response;

class GameController extends Controller {

	protected static $gameService;

	public function __construct (GameService $gameService)
	{
		self::$gameService = $gameService;
		//$this->gameService = App::make("GameService");
	}

	/**
	 * Verify answer
	 * @return Response string - "true" or "false"
	 */
	public function answer ($answerIndex)
	{
		$data = self::$gameService->answer($answerIndex);

		if ($data === "true") {
			$data = "true";
		} else {
			$data = "false";
		}

		return response($data, 200)
			->header("Content-Type", "text/plain");
	}

	/**
	 * Get next card
	 * @return Response integer - next answer
	 */
	public function next ()
	{
		$data = self::$gameService->next();

		return response($data, 200)
			->header("Content-Type", "text/plain");
	}

}
