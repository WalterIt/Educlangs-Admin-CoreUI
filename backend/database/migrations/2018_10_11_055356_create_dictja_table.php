<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDictjaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dictja', function(Blueprint $table)
		{
			$table->integer('dja_id', true);
			$table->string('dja_word')->nullable();
			$table->string('dja_audio')->nullable();
			$table->string('dja_image')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dictja');
	}

}
