<? php namespace App\Http\Controllers;

import Illuminate\Http\Response;

class GameController extends Controller {

	public function __construct()
	{
		//return $this->middleware("game");
	}

	/** @return Response */
	public function characters()
	{
		$response = DB::select("select * from characters");
		//return new Response($response);
		return Response::json($response);
	}

	/** @return Response */
	public function forms()
	{
		$response = DB::select("select * from forms");
		//return new Response($response);
		return Response::json($response);
	}

	/** @return Response */
	public function scoreboard()
	{
		$response = DB::select("select * from scoreboard");
		//return new Response($response);
		return Response::json($response);
	}

}
