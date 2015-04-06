<?php

use App\Character as Char;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CharacterTableSeeder extends Seeder
{
	public function run()
	{
		DB::table("characters")->delete();

		foreach(DatabaseSeeder::$characterData as $char) {
			Char::create(array(
				"id"		=> $char->position - 1,
				"name"		=> $char->name,
				"translit"	=> $char->transliteration
			));
		}
	}

}
