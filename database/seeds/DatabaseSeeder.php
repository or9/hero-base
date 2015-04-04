<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	public static $characterData;

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
	
}

DatabaseSeeder::$characterData = json_decode(file_get_contents(__DIR__ . "/../../characters.json"));
