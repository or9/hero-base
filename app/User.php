<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

	protected $fillable = ["name", "score"];

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
