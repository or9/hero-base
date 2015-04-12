<?php namespace App\Http\Controllers;

use DB;

class GameController extends Controller {

	public function __construct ()
	{
		//return $this->middleware("game");
	}

	/** @return Response */
	public function characters ()
	{
		$data = $this::getAllFromTable("characters");
		return response()->json($data);
	}

	/** @return Response */
	public function forms ()
	{
		$data = $this::getAllFromTable("forms");
		return response()->json($data);
	}

	/** @return Response */
	public function scoreboard ()
	{
		$data = $this::getAllFromTable("scoreboard");
		return response()->json($data);
	}

	private static function getAllFromTable ($table)
	{
		return DB::select("select * from " . $table);
	}

}
