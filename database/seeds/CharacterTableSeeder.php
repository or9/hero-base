<?php

class CharacterTableSeeder extends Seeder
{
	public function run()
	{
		DB::table->("characters")->delete();

		foreach(DatabaseSeeder::$characterData as $char) {
			Character::create(array(
				"id"		=> $char->position - 1,
				"name"		=> $char->name,
				"translit"	=> $char->transliteration
			));
		}
	}

}
