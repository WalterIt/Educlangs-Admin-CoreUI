<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDictptTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dictpt', function(Blueprint $table)
		{
			$table->integer('dpt_id', true);
			$table->string('dpt_word')->nullable();
			$table->string('dpt_audio')->nullable();
			$table->string('dpt_image')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dictpt');
	}

}
