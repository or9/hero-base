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
	 * Save user model to DB
	 * @param {Request} request
	 * @param {String} request.name
	 * @param {int} Request.score
	 * @return {Response} JSON Response
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
	 * Get rows near score of indicated user
	 * @param {int} score - Score of user
	 * @return {Response} JSON Response
	 */
	public function getRelatedUsers ( $id )
	{
		$user = User::find( $id );

		$higherScoreUsers = User::where("score" > $user->score)->take(100)->get();
		$lowerScoreUsers = User::where("score" < $user->score)->take(100)->get();
		$data = array_merge($higherScoreUsers, $user, $lowerScoreUsers);

		return response()->json($data);
	}

	/**
	 * Get all database entries for users
	 * @param {string} name
	 * @return {Response} JSON Response
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
