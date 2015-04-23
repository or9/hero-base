<?php namespace App\Http\Controllers;

use DB;

class GameController extends Controller {

	public function __construct ()
	{
		//return $this->middleware("game");
	}

	public function getLastIndex () {
		$lastIndex = DB::table("characters")
			->last();

		return response()->json($lastIndex);
	}

	/**
	 * Returns a response containing a single row
	 * @param {int} Index
	 * @return Response
	 * */
	public function characterById ($id)
	{
		$data = DB::table("characters")
			->whereId($id)
			->first();

		if (!$data) {
			return response(null, 404);
		}

		return response()->json($data);
	}

	public function getNumberOfCharacters ($startId = 0, $numberOfEntries = 5)
	{
		$data = DB::table("characters")
			->skip($startId)
			->take($numberOfEntries)
			->get();

		if (!$data) {
			return response(null, 404);
		}

		return response()->json($data);
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
