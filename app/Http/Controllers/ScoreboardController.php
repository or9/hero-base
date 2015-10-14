<?php namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Response;
use \App\User;
use \App\Http\Requests\SaveScoreRequest;

class ScoreboardController extends Controller {

	public function __construct ()
	{
		//return $this->middleware("game");
	}

	/**
	 * @param {Request} request
	 * @param {String} request.name
	 * @param {int} Request.score
	 * @return JSON Response
	 */
	// public function save (Request $request)
	public function save (SaveScoreRequest $request)
	{
		$score = 0;

		if ($request->score) {
			$score = $request->score;
		}

		$name = substr($request->name, 0, 3);
		$name = str_pad($name, 3, "-");

		$user = new User;
		$user->name = $name;
		$user->score = $score;
		$user->save();

		return response()->json(["created" => true]);
	}

	/**
	 * @param {string} name
	 * @return JSON Response
	 */
	public function get ($name = null)
	{

		$nameDoesExist = $name !== 0 && $name !== null;

		if ($nameDoesExist) {
			$data = User::all()->where("name", $name)
				->orderBy("created_at")
				->get();
		} else {
			$data = User::all();
		}

		return response()->json($data);

	}

}
