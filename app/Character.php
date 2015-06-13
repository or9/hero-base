<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Character extends Model {

	protected $table = "characters";

	protected $guarded = ["*"];

	public $timestamps = false;

	/**
	 * Will hold references to each card retrieved from DB
	 */
	public static $charList = [];


	public function form ()
	{
		// first arg is model, second is foreign key name
		return $this->hasOne("App\Form", "fk_id_characters");
	}

	public function initialForm ()
	{
	}

	/*
 	public function diacrytic
	{
		return $this->hasMany("App\Diacrytic");
	}
	*/

}
