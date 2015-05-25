<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model {

	protected $table = "forms";

	public $timestamps = false;

	protected $guarded = ["*"];

}
