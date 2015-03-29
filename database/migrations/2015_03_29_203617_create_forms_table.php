<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormTable extends Migration {
	private $tableName = 'forms';

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create($tableName, function(Blueprint $table)
		{
			$table->engine = "InnoDB";
			$table->integer("character_id")
				->unsigned();
			$table->foreign("character_id")
				->references("id")
				->on("characters")
				->onDelete("cascade")
				->onUpdate("cascade");
			$table->char("isolated", 4);
			$table->char("initial", 4);
			$table->char("medial", 4);
			$table->char("final", 4);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop($tableName);
	}

}
