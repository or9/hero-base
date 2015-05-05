<?php namespace App\Http\Controllers;

use DB;
use Character;

class GameController extends Controller {

	public function __construct ()
	{
		//return $this->middleware("game");
	}

	/** @return Response */
	public function scoreboard ()
	{
		$data = $this::getAllFromTable("scoreboard");
		return response()->json($data);
	}

}
