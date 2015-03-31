<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormsTable extends Migration {

	private static $tableName = "forms";

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create($this::$tableName, function(Blueprint $table)
		{
			$table->engine = "InnoDB";
			$table->integer("fk_id_characters")
				->unsigned();
			$table->foreign("fk_id_characters")
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
		Schema::drop($this::$tableName);
	}

}
