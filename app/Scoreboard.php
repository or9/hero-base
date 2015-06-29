<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Scoreboard extends Model {

	protected $table = "scoreboard";

	protected $guarded = ["*"];

	//public $timestamps = false;

	public function all ()
	{
	}

	public function user ()
	{
		return $this->hasOne("App\User");
	}

}
