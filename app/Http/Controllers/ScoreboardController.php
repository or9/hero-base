<?php namespace App\Http\Controllers;

use DB;

class ScoreboardController extends Controller {

	public function __construct ()
	{
		//return $this->middleware("game");
	}

	/** @return Response */
	public function get ()
	{
		$data = $this::getAllFromTable("scoreboard");
		return response()->json($data);
	}

}
