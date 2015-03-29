<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	public static $characterData = getCharacterData();

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call("CharacterTableSeeder");
		$this->command->info("Characters table seeded!");
		$this->call("FormTableSeeder");
		$this->command->info("Char Forms table seeded!");
	}

	public static function getCharacterData()
	{
		$json = file_get_contents(__DIR__ "/characters.json");
		return json_decode($json);
		//$data = [];

		/*$jsonIterator = new RecursiveIteratorIterator(
			new RecursiveArrayIterator(json_decode($json, TRUE)),
			RecursiveIteratorIterator::SELF_FIRST);

		foreach($jsonIterator as $key => $val) {
			if(is_array($val)) {
				echo "$key:\n";
			} else {
				echo "$key => $val\n";
			}
		}*/
	}
}
