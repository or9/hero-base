<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCharacterTable extends Migration {
	private $tableName = 'characters';

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
			$table->integer('id')
				->unique()
				->unsigned();
			$table->string("name");
			$table->string("translit");
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
