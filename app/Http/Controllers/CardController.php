<?php namespace App\Http\Controllers;

use DB;
use App\Character;
use App\Services\GameService as GameService;
//use App;

class CardController extends Controller {

	private $gameService;

	/**
	 * constructs a CardController
	 * @param GameService
	 * @return void
	 */
	public function __construct (GameService $gameService)
	{
		$this->gameService = $gameService;
	}

	/**
	 * Gets the total length of entries as int
	 * @return Response
	 */
	public function length ()
	{
		$lastIndex = Character::all()->count();

		return response()->json($lastIndex);
	}

	/** @return Response */
	public function form ($id = null)
	{

		if (!$id && (string)$id !== "0") {
			$data = Character::with("form")->get();
			//var_dump($data[0]);

		} else {

			$data = Character::find($id)->form;

		}

		return response()->json($data);

	}

	/**
	 * Returns a response containing a single row or all rows
	 * @param {int?} Index
	 * @return Response
	 * */
	public function character ($id = null)
	{
		if (!$id && (string)$id !== "0") {

			$data = Character::all();
			$data = $data[0];

		} else {

			$data = Character::find($id);

		}

		print_r($this->gameService);
		$this->gameService->add($data);


		return response()->json($data);
	}


}
