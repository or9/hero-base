<?php namespace App\Http\Controllers;

use DB;
use App\Character;

class CardController extends Controller {

	public function __construct ()
	{
		//return $this->middleware("game");
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
	public function form ($id)
	{

		if (!$id && $id !== 0) {

			$data = $this::getAllFromTable("forms");

		} else {

			$data = Character::find($id)->form;

		}

		return response()->json($data);

	}

	/**
	 * Returns a response containing a single row
	 * @param {int?} Index
	 * @return Response
	 * */
	public function character ($id)
	{
		if (!$id && $id * 1 !== 0) {

			$data = Character::all();

		} else {

			$data = Character::find($id);

		}

		return response()->json($data);
	}


}
