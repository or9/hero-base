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
			$table->char("isolated", 1);
			$table->char("initial", 1);
			$table->char("medial", 1);
			$table->char("final", 1);
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
