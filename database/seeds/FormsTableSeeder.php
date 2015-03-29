<?php

class FormTableSeeder extends Seeder
{
	public function run()
	{
		DB::table("forms")->delete();

		foreach(DatabaseSeeder::$characterData as $char) {
			Form::create(array(
				"fk_id_characters"	=> $char->position - 1,
				"isolated"		=> $char->contextualForms->isolated,
				"initial"		=> $char->contextualForms->initial,
				"medial"		=> $char->contextualForms->medial,
				"final"			=> $char->contextualForms->final
			));
		}
	}
}
