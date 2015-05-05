<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Character extends Model {

	protected $table = "characters";
	protected $guarded = ["*"];

	public $timestamps = false;


	public function form ()
	{
		return $this->hasOne("App\Form");
	}

	/*
 	public function diacrytic
	{
		return $this->hasMany("App\Diacrytic");
	}
	*/



}
