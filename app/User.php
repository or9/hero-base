<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class User extends Model
{

	protected $fillable = ["name", "score"];

	public function getRelatedUsers ($query) {
	}

	public function scopeScoreboard ($query) {
		return $query->all()->get();
	}

	public function scopeTopScore ($query) {

		return $query->all()
			->orderBy("score", "desc")
			->take(10)
			->get();

	}
}
