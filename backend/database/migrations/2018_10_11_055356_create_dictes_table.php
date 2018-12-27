<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDictesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dictes', function(Blueprint $table)
		{
			$table->integer('des_id', true);
			$table->string('des_word')->nullable();
			$table->string('des_audio')->nullable();
			$table->string('des_image')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dictes');
	}

}
